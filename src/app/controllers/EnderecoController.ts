import * as Yup from 'yup';
import { Request, Response } from "express";
import EnderecoRepository from '../../repositories/EnderecoRepository';
import { getCustomRepository } from 'typeorm';
  
class EnderecoController{
    async store(req:Request, res:Response){
        const schema = Yup.object().shape({
            provincia_id: Yup.string().required(),
            municipio_id: Yup.string().required()
          });
          if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({ message: "erro de validação na entrada de valores! porfavor verifique o valor no campo" });
          }

          try {
            const enderecoRepository = getCustomRepository(EnderecoRepository)
      
            const { provincia_id, municipio_id} = req.body;
          
            const Exist = await  enderecoRepository.findOne({ provincia_id, municipio_id })
          
      
            if ( Exist) {
              
              return res.status(404).json({ message: 'Endereco already exists' })
            }
            const Endereco =  enderecoRepository.create( req.body );
      
             await enderecoRepository.save(Endereco)
        
            return res.status(201).json(Endereco)
         } catch (error) {
            return res.status(500).json({err: + error})
          }
    }

    async index(req: Request, res:Response){
        const Endereco = getCustomRepository(EnderecoRepository)
        const ExistEndereco =  await Endereco.find()
        return res.status(400).json({ExistEndereco})
    };

    async getOne(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const enderecoRepository = getCustomRepository(EnderecoRepository)
            const ExistEndereco = await enderecoRepository.findOne({id})  
            
            if (ExistEndereco) {
              const result = ExistEndereco
              
              return res.status(200).json(result)
            }
            return res.status(404).json({ message: "Endereco does not found!" })
      
          } catch (error) {
              return res.status(500).json({ err: + error })
          }
        };

      async update(req: Request, res: Response) {
        const schema = Yup.object().shape({
            provincia_id: Yup.string().required(),
            municipio_id: Yup.string().required(),
          });

          if(!(await schema.isValid(req.body))){
      
            return res.status(400).json({ message: "erro de validação na entrada de valores! verifique o valor no campo" });
          }

            
   
    try {
        const { id }= req.params
        const { provincia_id, municipio_id } = req.body
      
        const enderecoRepository = getCustomRepository(EnderecoRepository)
        const enderecoOld= await enderecoRepository.findOne({ id })
        
          const updatedOneEndereco = 1
          const Endereco =  await enderecoRepository.update({ id }, { provincia_id, municipio_id })
        
        if (Endereco.affected === updatedOneEndereco) {
            
          const enderecoUpdated = await enderecoRepository.findOne({ id })
            
          return res.status(200).json({enderecoOld,enderecoUpdated})
        }
       return res.status(404).json({ message:"endereco not found to update "})
  
      } catch (error) {
          
          return res.status(500).json({ err: + error })
        }
    };  
    
    async delete(req:Request, res: Response){

        try {
            const { id } = req.params
          
            const enderecoRepository = getCustomRepository(EnderecoRepository)
            const ExistEndereco = await enderecoRepository.findOne({id})
          
            if (!ExistEndereco) {
      
              return res.status(404).json({ message: "Endereco does not found " })
            }
      
              const deletedOneEndereco = 1
              const Endereco =  await enderecoRepository.delete({ id })
            
              if (Endereco.affected === deletedOneEndereco) {
                const enderecoDeleted =  ExistEndereco
      
                return res.status(200).json({ message:"this Endereco was deleted!"+ enderecoDeleted })
              }
          } catch (error) {
              return res.status(500).json({ err:  + error })
    }
}

}
export default new EnderecoController;