import * as Yup from 'yup';
import { Request, Response } from "express";
import ClasseRepository from '../../repositories/ClasseRepository';
import { getCustomRepository } from 'typeorm';
  
class ClasseController{
    async store(req:Request, res:Response){
        const schema = Yup.object().shape({
            number: Yup.string().required(),
          });
          if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({ message: "erro de validação na entrada de valores! porfavor verifique o valor no campo" });
          }

          try {
            const classeRepository = getCustomRepository(ClasseRepository)
      
            const { number} = req.body;
          
            const ExistClasse = await  classeRepository.findOne({ number })
          
      
            if ( ExistClasse) {
              
              return res.status(404).json({ message: 'Classe already exists' })
            }
            const Classe =  classeRepository.create( req.body );
      
             await classeRepository.save(Classe)
        
            return res.status(201).json(Classe)
         } catch (error) {
            return res.status(500).json({err: + error})
          }
    }

    async index(req: Request, res:Response){
        const Classe = getCustomRepository(ClasseRepository)
        const ExistClasse =  await Classe.find()
        return res.status(400).json({ExistClasse})
    };

    async getOne(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const classeRepository = getCustomRepository(ClasseRepository)
            const ExistClasse = await classeRepository.findOne({id})  
            
            if (ExistClasse) {
              const result = ExistClasse
              
              return res.status(200).json(result)
            }
            return res.status(404).json({ message: "Classe does not found!" })
      
          } catch (error) {
              return res.status(500).json({ err: + error })
          }
        };

      async update(req: Request, res: Response) {
        const schema = Yup.object().shape({
            number: Yup.string().required(),
          });

          if(!(await schema.isValid(req.body))){
      
            return res.status(400).json({ message: "erro de validação na entrada de valores! verifique o valor no campo" });
          }

            
   
    try {
        const { id }= req.params
        const { number } = req.body
      
        const classeRepository = getCustomRepository(ClasseRepository)
        const classeOld= await classeRepository.findOne({ id })
        
          const updatedOneClasse = 1
          const Classe =  await classeRepository.update({ id }, { number })
        
        if (Classe.affected === updatedOneClasse) {
            
          const classeUpdated = await classeRepository.findOne({ id })
            
          return res.status(200).json({classeOld,classeUpdated})
        }
       return res.status(404).json({ message:"classe not found to update "})
  
      } catch (error) {
          
          return res.status(500).json({ err: + error })
        }
    };  
    
    async delete(req:Request, res: Response){

        try {
            const { id } = req.params
          
            const classeRepository = getCustomRepository(ClasseRepository)
            const ExistClasse = await classeRepository.findOne({id})
          
            if (!ExistClasse) {
      
              return res.status(404).json({ message: "Classe does not found " })
            }
      
              const deletedOneClasse = 1
              const Classe =  await classeRepository.delete({ id })
            
              if (Classe.affected === deletedOneClasse) {
                const classeDeleted =  ExistClasse
      
                return res.status(200).json({ message:"this Classe was deleted!"+ classeDeleted.number })
              }
          } catch (error) {
              return res.status(500).json({ err:  + error })
    }
}

}
export default new ClasseController;