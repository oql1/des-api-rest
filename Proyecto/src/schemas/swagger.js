/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - id
 *         - name
 *         - email
 *         - age
 *       properties:
 *         id:
 *           type: integer
 *           minimum: 1
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *         email:
 *           type: string
 *           format: email
 *         age:
 *           type: integer
 *           minimum: 0
 *           maximum: 120
 *         phone:
 *           type: string
 *           pattern: ^\+?[0-9]{7,15}$
 *     RegisterInput:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - name
 *         - email
 *         - password
 *         - age
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 128
 *           writeOnly: true
 *         age:
 *           type: integer
 *           minimum: 0
 *           maximum: 120
 *         phone:
 *           type: string
 *           pattern: ^\+?[0-9]{7,15}$
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 1
 *           maxLength: 128
 *           writeOnly: true
 *     AccessToken:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - accessToken
 *       properties:
 *         accessToken:
 *           type: string
 *     Error:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *     ValidationError:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - error
 *         - details
 *       properties:
 *         error:
 *           type: string
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - field
 *               - message
 *             properties:
 *               field:
 *                 type: string
 *               message:
 *                 type: string
 *   responses:
 *     Unauthorized:
 *       description: JWT ausente, inválido o expirado.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Error"
 *     NotFound:
 *       description: Usuario no encontrado.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Error"
 */
