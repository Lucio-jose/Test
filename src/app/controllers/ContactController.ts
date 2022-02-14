import * as Yup from 'yup';
import { Request, Response } from "express";
import ContactRepository from '../../repositories/ContactRepository';
import { getCustomRepository } from 'typeorm';
 
class ContactController{
    async store(req:Request, res:Response){
        const schema = Yup.object().shape({
            descricao: Yup.string().required(),
            userId: Yup.string().required()
          });
          if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({ message: "erro de validação na entrada de valores! porfavor verifique o valor no campo" });
          }

          try {
            const contactRepository = getCustomRepository(ContactRepository)
      
            const { descricao, userId } = req.body;
          
            const ExistContact = await  contactRepository.findOne({ userId  })
          
      
            if ( ExistContact) {
              
              return res.status(404).json({ message: 'Contact already exists' })
            }
            const Contact =  contactRepository.create( req.body );
      
             await contactRepository.save(Contact)
        
            return res.status(201).json(Contact)
         } catch (error) {
      
            return res.status(500).json({err: + error})
          }
    }

    async index(req: Request, res:Response){
        const Contact = getCustomRepository(ContactRepository)
        const ExistContact =  await Contact.find()
        return res.status(400).json({ExistContact})
    };

    async getOne(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const contactRepository = getCustomRepository(ContactRepository)
            const ExistContact = await contactRepository.findOne({id})  
            
            if (ExistContact) {
              const result = ExistContact
              
              return res.status(200).json(result)
            }
            return res.status(404).json({ message: "Contact does not found!" })
      
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
        const { descricao } = req.body
      
        const contactRepository = getCustomRepository(ContactRepository)
        const contactOld= await contactRepository.findOne({ id })
        
          const updatedOneContact = 1
          const Contact =  await contactRepository.update({ id }, { descricao })
        
        if (Contact.affected === updatedOneContact) {
            
          const contactUpdated = await contactRepository.findOne({ id })
            
          return res.status(200).json({contactOld,contactUpdated})
        }
       return res.status(404).json({ message:"contact not found to update "})
  
      } catch (error) {
          
          return res.status(500).json({ err: + error })
        }
    };  
    
    async delete(req:Request, res: Response){

        try {
            const { id } = req.params
          
            const contactRepository = getCustomRepository(ContactRepository)
            const ExistContact = await contactRepository.findOne({id})
          
            if (!ExistContact) {
      
              return res.status(404).json({ message: "Contact does not found " })
            }
      
              const deletedOneContact = 1
              const Contact =  await contactRepository.delete({ id })
            
              if (Contact.affected === deletedOneContact) {
                const contactDeleted =  ExistContact
      
                return res.status(200).json({ message:"this Contact was deleted!"+ contactDeleted.descricao })
              }
          } catch (error) {
              return res.status(500).json({ err:  + error })
    }
}

}
export default new ContactController;