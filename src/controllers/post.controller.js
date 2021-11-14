const Post = require('../models/post.model');
const User = require('../models/user.model')
const cloudinary = require('cloudinary');

/* CONTROLLADOR PARA EL MODELO DE LAS PUBLICACIONES DE LOS USUARIOS */

const getPosts = async (req, res) => {
    /* FUNCIÓN QUE RETORNA TODAS LAS PUBLICACIONES DE LA BASE DE DATOS */
    await Post.find().then(posts => {
        if (!posts) {
            res.status(404).send({message: 'Posts not found'});
        } else {
            res.status(200).send({posts: posts});
        }
    }).catch(err => {
        res.status(500).send({message: 'An error ocurred while searching'});
    });
};

const getPostsByUser = async (req, res) => {
    /* FUNCIÓN QUE RETORNA LAS PUBLICACIONES REALIZADAS POR UN USUARIO, SON MOSTRADAS EN SU PERFIL */
    const { id_params } = req.params;
    
    await Post.find({user_of: id_params}).then(posts => {
        if (!posts) { // EN CASO DE NO SER ENCONTRADAS, SE RETORNA UN MENSAJE DE ERROR DE STATUS 404
            res.status(404).send({message: 'Posts not found'}); 
        } else { // EN CASO DE SER ENCONTRADA, SON RETORNADAS EN FORMA DE ARCHIVO JSON CON EL NOMBRE DE POSTS
            res.status(200).send({posts});
        }
    }).catch(err => { // SI EXISTE UN ERROR, ES DEVUELTO Y MANEJADO POR EL FRONT
        res.status(500).send({err});
    });
};

const getPostsByFollowing = async (req, res) => {
    /*  FUNCIÓN QUE RETORNA LAS PUBLICACIONES REALIZADAS POR LOS SEGUIDOS DEL USUARIO REGISTRADO
        SE REQUIERE DE UN TOKEN Y DE LA ID DEL USUARIO */
    const { id_params } = req.params;
    let posts = [];

    await User.findById(id_params).then(async userFound => {
        if (!userFound) {
            res.status(404).send({message: 'User not found'});
        } else {
            for (let index = 0; index < userFound.following.length; index++) {
                await Post.find({user_of: userFound.following[index]._id}).then(postsFound => {
                    if (postsFound) {
                        posts.push(postsFound);
                    }
                }).catch(err => {
                    res.status(500).send({message: 'An error ocurred while searching'});
                });
            } 
            // LUEGO AGREGAR LAS PUBLICACIONES REALIZADAS POR EL USUARIO REGISTRADO
            await Post.find({user_of: id_params}).then(postsUser => {
                if (postsUser) {
                    console.log(postsUser);
                    posts.push(postsUser);
                    res.status(200).send({posts});
                }
            }).catch(err => {
                res.status(500).send({message: 'An error ocurred while searching'});
            });
            
        }
    }).catch(err => {
        res.status(500).send(err);
    })

    
};

const getPostByID = async (req, res) => { 
    /* FUNCIÓN QUE RETORNA ESPECÍFICAMENTE LOS DATOS DE UNA SOLA PUBLICACIÓN */
    const { id_params } = req.params;

    await Post.findOne({_id: id_params}).then(post => {
        if (!post) {
            res.status(404).send({message: 'Posts not found'});
        } else {
            res.status(200).send({post: post});
        }
    }).catch(err => {
        res.status(500).send({message: 'An error ocurred while searching'});
    });
};

const updatePostByID = async (req, res) => {
    /*  FUNCIÓN QUE SE ENCARGA DE ACTUALIZAR LOS DATOS DE UNA PUBLICACIÓN,
        DE ELLA SE REQUIERE DE UN TOKEN, DE UNA ID DEL POST Y DEL CUERPO DEL POST */
    const { id_params } = req.params;
    const request = req.body;

    await Post.findOneAndUpdate({_id: id_params}, request).then(postUpdate => {
        if (!postUpdate) {
            res.status(404).send({message: 'Posts not found'});
        } else {
            res.status(200).send({post: postUpdate});
        }
    }).catch(err => {
        res.status(500).send({message: 'An error ocurred while searching'});
    })
};

const postPost = async (req, res) => {
    /*  FUNCIÓN QUE SE ENCARGA DE REALIZAR LA PUBLICACIÓN DEL POST, DONDE VIENE INCLUIDO LA SUBIDA DE IMAGENES
        AL SERVICIO DE CLOUDINARY, PARA ELLO ES NECESARIO DE UN TOKEN Y DEL CUERPO DEL POST */
    const { description, nametags } = req.body;
    const { id_params } = req.params;
    const file = req.file;
    
    if (!file) { // EN CASO DE NO HABER UNA PETICIÓN DE IMAGEN, SE LE HACE SABER AL USUARIO QUE SUBA UNA
        res.status(200).send({message: 'Fill the image'}); 
    }
    // LUEGO DE OBTENER LA IMAGEN, ES SUBIDA A CLOUDINARY
    const result_file = await cloudinary.v2.uploader.upload(file.path);
    // PARA NO HACER ESPACIO EN LA CARPETA DEL BACKEND, ESTAS IMAGENES SON DESENLAZADAS Y ELIMINADAS, QUEDANDO
    // SOLAMENTE ALMACENADAS EN CLOUDINARY A TRAVÉS DE UNA URL.
    fs.unlink(req.file.path, (err) => {
        if (err) throw err;
        console.log('path was deleted');
    });
    // SE CREA UN OBJETO DE TIPO POST PARA LUEGO SER GUARDADO EN LA BASE DE DATOS
    const post = new Post({description, image: result_file.url, user_of: id_params, nametags});

    await post.save().then(postSaved => {
        res.status(200).send({post: postSaved});
    }).catch(err => {
        res.status(500).send({error: err});
    });
};

const deletePost = async (req, res) => {
    /*  FUNCIÓN QUE SE ENCARGA DE ELIMINAR UNA PUBLICACIÓN PROPIA, PARA ELLO
        SE NECESITA DE UN TOKEN Y DE LA ID DE LA PUBLICACIÓN.
        POR ÚLTIMO, ES NECESARIO ELIMINAR REFERENCIAS DE LOS USUARIOS REACCIONADOS Y GUARDADOS */
    const { id_params } = req.params;

    await Post.findByIdAndDelete(id_params).then(postRemove => {
        if (!postRemove) {
            res.status(404).send({message: 'Post not found'});
        } else {
            res.status(200).send({post: postRemove});
        }
    }).catch(err => {
        res.status(500).send({error: err});
    });
}

module.exports = {
    getPosts,
    getPostsByUser,
    getPostByID,
    getPostsByFollowing,
    updatePostByID,
    postPost,
    deletePost
}