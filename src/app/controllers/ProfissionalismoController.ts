import * as Yup from 'yup';
import { Request, Response } from "express";
import ProfissionalismoRepository from '../../repositories/ProfissionalismoRepository';
import { getCustomRepository } from 'typeorm';
 
class ProfissionalismoController{
    async store(req:Request, res:Response){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required() 
          });
          if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({ message: "erro de validação na entrada de valores! porfavor verifique o valor no campo" });
          }

          try {
            const profissionalismoRepository = getCustomRepository(ProfissionalismoRepository)
      
            const { name, description} = req.body;
          
            const Exist = await  profissionalismoRepository.findOne({ name, description })
          
      
            if ( Exist) {
              
              return res.status(404).json({ message: 'Profissionalismo already exists' })
            }
            const Profissionalismo =  profissionalismoRepository.create( req.body );
      
             await profissionalismoRepository.save(Profissionalismo)
        
            return res.status(201).json(Profissionalismo)
         } catch (error) {
            return res.status(500).json({err: + error})
          }
    }

    async index(req: Request, res:Response){
        const Profissionalismo = getCustomRepository(ProfissionalismoRepository)
        const ExistProfissionalismo =  await Profissionalismo.find()
        return res.status(400).json({ExistProfissionalismo})
    };

    async getOne(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const profissionalismoRepository = getCustomRepository(ProfissionalismoRepository)
            const ExistProfissionalismo = await profissionalismoRepository.findOne({id})  
            
            if (ExistProfissionalismo) {
              const result = ExistProfissionalismo
              
              return res.status(200).json(result)
            }
            return res.status(404).json({ message: "Profissionalismo does not found!" })
      
          } catch (error) {
              return res.status(500).json({ err: + error })
          }
        };

      async update(req: Request, res: Response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required(),
          });

          if(!(await schema.isValid(req.body))){
      
            return res.status(400).json({ message: "erro de validação na entrada de valores! verifique o valor no campo" });
          }

            
   
    try {
        const { id }= req.params
        const { name,description} = req.body
      
        const profissionalismoRepository = getCustomRepository(ProfissionalismoRepository)
        const profissionalismoOld= await profissionalismoRepository.findOne({ id })
        
          const updatedOneProfissionalismo = 1
          const Profissionalismo =  await profissionalismoRepository.update({ id }, {name, description })
        
        if (Profissionalismo.affected === updatedOneProfissionalismo) {
            
          const profissionalismoUpdated = await profissionalismoRepository.findOne({ id })
            
          return res.status(200).json({profissionalismoOld,profissionalismoUpdated})
        }
       return res.status(404).json({ message:"profissionalismo not found to update "})
  
      } catch (error) {
          
          return res.status(500).json({ err: + error })
        }
    };  
    
    async delete(req:Request, res: Response){

        try {
            const { id } = req.params
          
            const profissionalismoRepository = getCustomRepository(ProfissionalismoRepository)
            const ExistProfissionalismo = await profissionalismoRepository.findOne({id})
          
            if (!ExistProfissionalismo) {
      
              return res.status(404).json({ message: "Profissionalismo does not found " })
            }
      
              const deletedOneProfissionalismo = 1
              const Profissionalismo =  await profissionalismoRepository.delete({ id })
            
              if (Profissionalismo.affected === deletedOneProfissionalismo) {
                const profissionalismoDeleted =  ExistProfissionalismo
      
                return res.status(200).json({ message:"this Profissionalismo was deleted!"+ profissionalismoDeleted })
              }
          } catch (error) {
              return res.status(500).json({ err:  + error })
    }
}

}
export default new ProfissionalismoController;