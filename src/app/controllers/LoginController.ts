import * as Yup from 'yup';
import { Request, Response } from "express";
import LoginRepository from '../../repositories/LoginRepository';
import { hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
 
class LoginController{
    async store(req:Request, res:Response){
        const schema = Yup.object().shape({
            password: Yup.string().required(),
            contactId: Yup.string().required()
          });
          if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({ message: "erro de validação na entrada de valores! porfavor verifique o valor no campo" });
          }

          try {
            const loginRepository = getCustomRepository(LoginRepository)
      
            const { password, contactId } = req.body;
          
            const ExistLogin = await  loginRepository.findOne({ contactId })
          
      
            if ( ExistLogin) {
              
              return res.status(404).json({ message: 'Login already exists' })
            }

            if(password.length<5){
              return res.status(400).json({message:"Password deve conter no mínimo 6 dígitos"})
            }
            const passcript =await hash(password, 8)

            const Login =  loginRepository.create({
              password:passcript,
              contactId
            });
      
             await loginRepository.save(Login)
        
            return res.status(201).json(Login)
         } catch (error) {
      
            return res.status(500).json({err: + error})
          }
    }

    async index(req: Request, res:Response){
        const Login = getCustomRepository(LoginRepository)
        const ExistLogin =  await Login.find()
        return res.status(400).json({ExistLogin})
    };

    async getOne(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const loginRepository = getCustomRepository(LoginRepository)
            const ExistLogin = await loginRepository.findOne({id})  
            
            if (ExistLogin) {
              const result = ExistLogin
              
              return res.status(200).json(result)
            }
            return res.status(404).json({ message: "Login does not found!" })
      
          } catch (error) {
              return res.status(500).json({ err: + error })
          }
        };

      async update(req: Request, res: Response) {
        const schema = Yup.object().shape({
            password: Yup.string().required(),
          });

          if(!(await schema.isValid(req.body))){
      
            return res.status(400).json({ message: "erro de validação na entrada de valores! verifique o valor no campo" });
          }

    try {
        const { id }= req.params
        const { password } = req.body
      
        const loginRepository = getCustomRepository(LoginRepository)
        const loginOld= await loginRepository.findOne({ id })
        
          const updatedOneLogin = 1
          const Login =  await loginRepository.update({ id }, { password })
        
        if (Login.affected === updatedOneLogin) {
            
          const loginUpdated = await loginRepository.findOne({ id })
            
          return res.status(200).json({loginOld,loginUpdated})
        }
       return res.status(404).json({ message:"login not found to update "})
  
      } catch (error) {
          
          return res.status(500).json({ err: + error })
        }
    };  
}
export default new LoginController;