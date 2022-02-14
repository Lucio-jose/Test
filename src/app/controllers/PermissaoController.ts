import * as Yup from 'yup';
import { Request, Response } from "express";
import PermissaoRepository from '../../repositories/PermissaoRepository';
import { getCustomRepository } from 'typeorm';

class PermissaoController{
    async store(req:Request, res:Response){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string()
          });
          if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({ message: "erro de validação na entrada de valores! porfavor verifique o valor no campo" });
          }

          try {
            const permissaoRepository = getCustomRepository(PermissaoRepository)
      
            const { name,description } = req.body;
          
            const ExistPermissao = await  permissaoRepository.findOne({ name  })
          
      
            if ( ExistPermissao) {
              
              return res.status(404).json({ message: 'Permissao already exists' })
            }
            const Permissao =  permissaoRepository.create( req.body );
      
             await permissaoRepository.save(Permissao)
        
            return res.status(201).json(Permissao)
         } catch (error) {
      
            return res.status(500).json({err: + error})
          }
    }

    async index(req: Request, res:Response){
        const Permissao = getCustomRepository(PermissaoRepository)
        const ExistPermissao =  await Permissao.find()
        return res.status(400).json({ExistPermissao})
    };

    async getOne(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const permissaoRepository = getCustomRepository(PermissaoRepository)
            const ExistPermissao = await permissaoRepository.findOne({id})  
            
            if (ExistPermissao) {
              const result = ExistPermissao
              
              return res.status(200).json(result)
            }
            return res.status(404).json({ message: "Permissao does not found!" })
      
          } catch (error) {
              return res.status(500).json({ err: + error })
          }
        };

      async update(req: Request, res: Response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string().required()
          });

          if(!(await schema.isValid(req.body))){
      
            return res.status(400).json({ message: "erro de validação na entrada de valores! verifique o valor no campo" });
          }

            
   
    try {
        const { id }= req.params
        const { name } = req.body
      
        const permissaoRepository = getCustomRepository(PermissaoRepository)
        const permissaoOld= await permissaoRepository.findOne({ id })
        
          const updatedOnePermissao = 1
          const Permissao =  await permissaoRepository.update({ id }, { name })
        
        if (Permissao.affected === updatedOnePermissao) {
            
          const permissaoUpdated = await permissaoRepository.findOne({ id })
            
          return res.status(200).json({permissaoOld,permissaoUpdated})
        }
       return res.status(404).json({ message:"permissao not found to update "})
  
      } catch (error) {
          
          return res.status(500).json({ err: + error })
        }
    };  
    
    async delete(req:Request, res: Response){

        try {
            const { id } = req.params
          
            const permissaoRepository = getCustomRepository(PermissaoRepository)
            const ExistPermissao = await permissaoRepository.findOne({id})
          
            if (!ExistPermissao) {
      
              return res.status(404).json({ message: "Permissao does not found " })
            }
      
              const deletedOnePermissao = 1
              const Permissao =  await permissaoRepository.delete({ id })
            
              if (Permissao.affected === deletedOnePermissao) {
                const permissaoDeleted =  ExistPermissao
      
                return res.status(200).json({ message:"this Permissao was deleted!"+ permissaoDeleted.name })
              }
          } catch (error) {
              return res.status(500).json({ err:  + error })
    }
}

}
export default new PermissaoController;