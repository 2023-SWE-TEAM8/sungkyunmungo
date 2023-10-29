import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
	swaggerDefinition: {
    	openapi: "3.0.3",
        info: {
        	title: 'Express Service with Swagger',
            version: '1.0.0',
            description: 'a Rest api using swagger and express.', // 프로젝트 설명
        },
        servers: [
        	{
            	url: "http://localhost:8000",
            },
       ],
	},
    apis: ['./backend/*.js', './backend/routes/*.js', './backend/models/*.js'] //Swagger 파일 연동
}

const specs = swaggerJsdoc(options)

export {
    swaggerUi,
    specs
}
