import { Request, Response } from "express";
import * as Yup from 'yup';
import { getCustomRepository } from "typeorm";
import TestRepository from "../../repositories/TestRepository";
import RoleRepository from "../../repositories/RoleRepository";
 
class TestController{
    async store(req:Request, res:Response){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            roleId: Yup.string().required()
          });
          if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
              message: 'erro de validação na entrada de valores!',
            });
          }
        try{
            const{name,roleId}=req.body
    
            const testRepository = getCustomRepository(TestRepository)
            const Exist = await testRepository.findOne({where:{name}})
            const Role = getCustomRepository(RoleRepository)
            const ExistProfissao = await Role.findOne(roleId)
            
            if(Exist){
                return res.status(400).json({message:"Test já Exist"})
            }
    
            if(!ExistProfissao){
              return res.status(404).json({message:"Role not founds"})
            }

           const Test= testRepository.create({
               name,
               roleId:ExistProfissao
           })
            const result = await testRepository.save(Test);
            return res.status(201).json(result);
        }catch(error){
            return res.status(500).json(error)
        }
    }
    async index(req: Request, res: Response) {
      try {
          const testRepository = getCustomRepository(TestRepository);
          const existTest = await testRepository.find();
          return res.status(200).json(existTest);
      } catch (error) {
          return res.status(404).json("erro" + error);
      }
  }
}
export default new TestController;