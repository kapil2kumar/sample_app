exports.validateCreateAgencyAndClient = {
    type: 'object',
    properties: {
        agency:{
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    required: true,
                    minLength: 2,
                    maxLength: 50
                },
                address1:{
                    type : 'string',
                    required : true,
                    minLength: 2,
                    maxLength: 100
                },
                address2:{
                    type : 'string',
                    required : false,
                    minLength: 2,
                    maxLength: 100
                },
                state:{
                    type : 'string',
                    required : true,
                    minLength: 2,
                    maxLength: 20
                },
                city:{
                    type : 'string',
                    required : true,
                    minLength: 2,
                    maxLength: 20
                },
                phone:{
                    type : 'integer',
                    required : true,
                    pattern: "^[1-9]{1}[0-9]{9}$",
                    minimum:1000000000,
                    maximum:9999999999
                }
            }
        },
        client:{
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    required: true,
                    minLength: 3,
                    maxLength: 50
                },
                email:{
                    type : 'string',
                    required : true,
                    pattern: "^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$",
                    minLength: 3,
                    maxLength: 50
                },
                phone:{
                    type : 'integer',
                    required : true,
                    pattern: "^[1-9]{1}[0-9]{9}$",
                    minimum:1000000000,
                    maximum:9999999999
                },
                totalBill:{
                    type : 'integer',
                    required : true,
                    minimum:0                
                }
            }
        }
    }
};

exports.validateUpdateClient = {
    type: 'object',
    properties: {
        _id: {
            type: 'string',
            required: true,
            pattern: "^[0-9a-fA-F]{24}$"
        },
        name: {
            type: 'string',
            required: true,
            minLength: 3,
            maxLength: 50
        },
        email:{
            type : 'string',
            required : true,
            pattern: "^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$",
            minLength: 3,
            maxLength: 50
        },
        phone:{
            type : 'integer',
            required : true,
            pattern: "^[1-9]{1}[0-9]{9}$",
            minimum:1000000000,
            maximum:9999999999
        },
        totalBill:{
            type : 'integer',
            required : true,
            minimum:0                
        }
    }
};