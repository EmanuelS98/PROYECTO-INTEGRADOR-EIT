db.institutions.insertOne({
    name: "Gaming Store",
    address: "Sarmiento 330221, Buenos Aires, Argentina",
    phone: "+54 011-4222333",
    email: "gamingstore@miapp.com",
    logo: "logo.png",
    mission: {
        description: "Nuestra misión como tienda gamer es acercarte la mejor tecnología y accesorios de videojuegos al mejor precio. En un mundo en constante evolución digital, buscamos que cada jugador, ya sea casual o profesional, pueda acceder a consolas, PCs, periféricos y accesorios de calidad. Queremos que disfrutes de tus juegos favoritos con el mejor rendimiento y con una atención personalizada que te acompañe en cada paso de tu experiencia gamer.",
        thumbnail: "mission.jpg",
    },
    vision: {
        description: "Nuestra visión es ser la tienda gamer de referencia, donde cada persona pueda encontrar el producto ideal para mejorar su experiencia de juego. Queremos un mundo más conectado a través del gaming, donde la diversión, la competencia y la tecnología estén al alcance de todos. Ya sea en nuestra plataforma online o en nuestro local físico, vas a poder descubrir consolas, accesorios, PC gamers y las últimas novedades del mercado. Soñamos con un futuro donde cada gamer tenga acceso a la mejor calidad, al mejor precio y con la mejor atención personalizada.",
        thumbnail: "vision.jpg",
    },
    values: {
        description: "Nuestros valores están enfocados en vos: el gamer. Nos respaldamos en brindar calidad, confianza y atención al cliente de primera, para que tu compra sea simple y segura. Creemos que cualquier persona puede ser parte del mundo gamer, sin importar si es tu primera consola, si estás armando tu PC gamer desde cero o si buscás ese accesorio que te falta para competir al máximo nivel. Siempre vas a contar con nuestro apoyo y asesoramiento para encontrar lo que realmente necesitás.",
        thumbnail: "values.jpg",
    },
    createdAt: new Date(),
    updatedAt: new Date()
});