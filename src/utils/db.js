// const username = process.env.username                            // or

const { username, password } = process.env


// export const connectionStr = "mongodb+srv://"+username+":"+password+"@cluster0.nxbvjq0.mongodb.net/product_db?retryWrites=true&w=majority&appName=Cluster0"
export const connectionStr = `mongodb+srv://demo-next:${password}@cluster0.nxbvjq0.mongodb.net/product_db?retryWrites=true&w=majority&appName=Cluster0`