import convict from 'convict'
import 'dotenv/config'

// application environments
const environments = ['production', 'development', 'test']

const config = convict({
	env: {
		doc: 'The application environment.',
		format: environments,
		default: 'development',
		env: 'NODE_ENV',
		arg: 'NODE_ENV'
	},
	port: {
		doc: 'The port to start the application on',
		format: 'port',
		default: 8080,
		env: 'PORT'
	},
	databaseUrl: {
		doc: 'MongoDB connection URL',
		format: String,
		default: '',
		nullable: false,
		env: 'DATABASE_URL'
	},
	jwt: {
		privateKey: {
			doc: 'Private RSA key to sign the jwt',
			format: String,
			default: 'a-private-key',
			nullable: false,
			env: 'JWT_PRIVATE_KEY'
		},
		publicKey: {
			doc: 'Public RSA key to verify the jwt',
			format: String,
			default: 'a-public-key',
			nullable: false,
			env: 'JWT_PUBLIC_KEY'
		}
	}
})

const env = config.get('env')

// don't load config file in production, instead load it
// from the system environment (automatic)
if (env !== 'production') {
	config.loadFile(env + '.json')
}

config.validate({ allowed: 'strict' })

export default config
