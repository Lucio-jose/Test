import * as Yup from 'yup';
import { Request, Response } from "express";
import TypeFileRepository from '../../repositories/TypeFileRepository';
import { getCustomRepository } from 'typeorm';
 
class TypefileController{
    async store(req:Request, res:Response){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string()
          });
          if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({ message: "erro de validação na entrada de valores! porfavor verifique o valor no campo" });
          }

          try {
            const typefileRepository = getCustomRepository(TypeFileRepository)
      
            const { name,description } = req.body;
          
            const ExistTypefile = await  typefileRepository.findOne({ name  })
          
      
            if ( ExistTypefile) {
              
              return res.status(404).json({ message: 'Typefile already exists' })
            }
            const Typefile =  typefileRepository.create( req.body );
      
             await typefileRepository.save(Typefile)
        
            return res.status(201).json(Typefile)
         } catch (error) {
      
            return res.status(500).json({err: + error})
          }
    }

    async index(req: Request, res:Response){
        const Typefile = getCustomRepository(TypeFileRepository)
        const ExistTypefile =  await Typefile.find()
        return res.status(400).json({ExistTypefile})
    };

    async getOne(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const typefileRepository = getCustomRepository(TypeFileRepository)
            const ExistTypefile = await typefileRepository.findOne({id})  
            
            if (ExistTypefile) {
              const result = ExistTypefile;
              return res.status(200).json(result)
            }
            return res.status(404).json({ message: "Typefile does not found!" })
      
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
      
        const typefileRepository = getCustomRepository(TypeFileRepository)
        const typefileOld= await typefileRepository.findOne({ id })
        
          const updatedOneTypefile = 1
          const Typefile =  await typefileRepository.update({ id }, { name })
        
        if (Typefile.affected === updatedOneTypefile) {
            
          const TypefileUpdated = await typefileRepository.findOne({ id })
            
          return res.status(200).json({typefileOld,TypefileUpdated})
        }
       return res.status(404).json({ message:"Typefile not found to update "})
  
      } catch (error) {
          
          return res.status(500).json({ err: + error })
        }
    };  
    
    async delete(req:Request, res: Response){

        try {
            const { id } = req.params
          
            const typefileRepository = getCustomRepository(TypeFileRepository)
            const ExistTypefile = await typefileRepository.findOne({id})
          
            if (!ExistTypefile) {
      
              return res.status(404).json({ message: "Typefile does not found " })
            }
      
              const deletedOneTypefile = 1
              const Typefile =  await typefileRepository.delete({ id })
            
              if (Typefile.affected === deletedOneTypefile) {
                const typefileDeleted =  ExistTypefile
      
                return res.status(200).json({ message:"this Typefile was deleted!"+ typefileDeleted.name })
              }
          } catch (error) {
              return res.status(500).json({ err:  + error })
    }
}

}
export default new TypefileController;