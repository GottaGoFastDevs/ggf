const userSchema = {
	Name: {
		type: String,
		label: 'First Name',
		rules: {
			required: true
		}
	},
	Email: {
		type: String,
		rules: {
			isEmail: true
		}
	},
	Age: {
		type: Number,
		rules: {
			decimalPoint: 0,
			min: 0,
			max: 18
		}
	}
};

const bookSchema = {
	Title: {
		type: String,
		rules: {
			required: true
		}
	}
};

const schemas = {
	collection: [
		{
			name: 'User',
			schema: UserSchema,
			collection: [
				{
					name: 'Book',
					schema: BookSchema
				}
			]
		}
	]
};

const { Users, User, CreateUser, UpdateUser } = useCRUD();

// Users.data : raw data from firebase
// Users : Table des utilisateurs

// User.data : raw user data from firebase
// user.books : Table des livres
// user.books.data : raw user's books from firebase

// UserFormCreate : Se charge de récupérer les données des fields
// CreateUser : Objet contenant tous les fields de User

return (
	<Form>
		<CreateUser.FirstName />
		<CreateUser.Email />
		<CreateUser.Age />
	</Form>
);
