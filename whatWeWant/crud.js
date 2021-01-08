const schemas = {
	User: {
		schema: {
			FirstName: {
				type: String,
				label: 'First Name',
				rules: {
					required: true
				}
			},
			LastName: {
				type: String,
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
		},
		get: {
			labels: [ 'FirstName', 'LastName', 'Email' ]
		}
	},
	Book: {
		schema: {
			Title: {
				type: String,
				rules: {
					required: true
				}
			},
			Owner: {
				type: User,
				rules: {
					required: true
				}
			}
		}
	}
};

const { UserList, UserContext, BookList } = useCRUD(schemas);

function UserListView() {
	return (
		<Layout>
			<UserList />
		</Layout>
	);
}

function BookListView(id) {
	return (
		<Layout>
			<UserContext id={id}>
				<BookList />
			</UserContext>
		</Layout>
	);
}
