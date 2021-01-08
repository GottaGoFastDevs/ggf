const danceSchema = {
    name: {
        type: String,
        rules: {
            required: true
        }
    },
    choreographyPdf: {
        type: String
    },
    choreographyVideo: {
        type: String
    },
    songLink: {
        type: String
    },
}

const classeSchema = {
    doneOn: {
        type: String, // YYYY-MM-DD
        rules: {
            required: true
        }
    },
    level: {
        type: String, // Enum : BEGINNER, NOVICE, INTERMEDIATE
        rules: {
            required: true
        }
    },
    // Relation one to one
    learnedDance: {
        type: "danceID", // Pointer vers la collection dance
    },
    // Relation many to many
    reviewedDances: {
        type: ["danceID"], // Pointer vers la collection dance
    }
}

const albumSchema = {
    doneOn: {
        type: String, // YYYY-MM-DD
        rules: {
            required: true
        }
    },
    name: {
        type: String,
        rules: {
            required: true
        }
    },
    photos: {
        type: [String],
        rules: {
            required: true,
            minLength: 1,
        }
    },
}

const eventSchema = {
    doneOn: {
        type: String, // YYYY-MM-DD
        rules: {
            required: true
        }
    },
    zipcode: {
        type: String,
        rules: {
            required: true
        }
    },
    city: {
        type: String,
        rules: {
            required: true
        }
    },
    club: {
        type: String,
        rules: {
            required: true
        }
    },
    isAtHome: {
        type: Boolean
    },
    posterPdf: {
        type: String
    },
}

export default {
    danceSchema,
    classeSchema,
    albumSchema,
    eventSchema
}