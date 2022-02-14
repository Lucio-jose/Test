import * as Yup from 'yup';
import { Request, Response } from "express";
import DisciplinaRepository from '../../repositories/DisciplinaRepository';
import { getCustomRepository } from 'typeorm';
 
class DisciplinaController{
    async store(req:Request, res:Response){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required()
          });
          if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({ message: "erro de validação na entrada de valores! porfavor verifique o valor no campo" });
          }

          try {
            const disciplinaRepository = getCustomRepository(DisciplinaRepository)
      
            const { name,description } = req.body;
          
            const ExistDisciplina = await  disciplinaRepository.findOne({ name  })
          
      
            if ( ExistDisciplina) {
              
              return res.status(404).json({ message: 'Discipllina already exists' })
            }
            const Disciplina =  disciplinaRepository.create( req.body );
      
             await disciplinaRepository.save(Disciplina)
        
            return res.status(201).json(Disciplina)
         } catch (error) {
      
            return res.status(500).json({err: + error})
          }
    }

    async index(req: Request, res:Response){
        const Disciplina = getCustomRepository(DisciplinaRepository)
        const ExistDisciplina =  await Disciplina.find()
        return res.status(400).json({ExistDisciplina})
    };

    async getOne(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const disciplinaRepository = getCustomRepository(DisciplinaRepository)
            const ExistDisciplina = await disciplinaRepository.findOne({id})  
            
            if (ExistDisciplina) {
              const result = ExistDisciplina
              
              return res.status(200).json(result)
            }
            return res.status(404).json({ message: "Disciplina does not found!" })
      
          } catch (error) {
              return res.status(500).json({ err: + error })
          }
        };

      async update(req: Request, res: Response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
          });

          if(!(await schema.isValid(req.body))){
      
            return res.status(400).json({ message: "erro de validação na entrada de valores! verifique o valor no campo" });
          }

            
   
    try {
        const { id }= req.params
        const { name } = req.body
      
        const disciplinaRepository = getCustomRepository(DisciplinaRepository)
        const disciplinaOld= await disciplinaRepository.findOne({ id })
        
          const updatedOneDisciplina = 1
          const Disciplina =  await disciplinaRepository.update({ id }, { name })
        
        if (Disciplina.affected === updatedOneDisciplina) {
            
          const disciplinaUpdated = await disciplinaRepository.findOne({ id })
            
          return res.status(200).json({disciplinaOld,disciplinaUpdated})
        }
       return res.status(404).json({ message:"disciplina not found to update "})
  
      } catch (error) {
          
          return res.status(500).json({ err: + error })
        }
    };  
    
    async delete(req:Request, res: Response){

        try {
            const { id } = req.params
          
            const disciplinaRepository = getCustomRepository(DisciplinaRepository)
            const ExistDisciplina = await disciplinaRepository.findOne({id})
          
            if (!ExistDisciplina) {
      
              return res.status(404).json({ message: "Disciplina does not found " })
            }
      
              const deletedOneDisciplina = 1
              const Disciplina =  await disciplinaRepository.delete({ id })
            
              if (Disciplina.affected === deletedOneDisciplina) {
                const disciplinaDeleted =  ExistDisciplina
      
                return res.status(200).json({ message:"this Disciplina was deleted!"+ disciplinaDeleted.name })
              }
          } catch (error) {
              return res.status(500).json({ err:  + error })
    }
}

}
export default new DisciplinaController;