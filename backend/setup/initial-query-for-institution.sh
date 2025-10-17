
db.intitutions.insertOne({
    name: "Mi App",
    address: "Calle Falsa 123",
    phone: "555-1234",
    email: "info@miapp.com",
    logo: "logo.png",
    mission: {
    description: "Proveer soluciones tecnológicas innovadoras.",
    image: "mission.png"
    },
    vision: {
    description: "Ser líderes en el mercado tecnológico.",
    image: "vision.png"
    },
    values: {
    description: "Innovación, Calidad, Compromiso.",
    image: "values.png"
    },
    createdAt: new Date(),
    updatedAt: new Date()

})


