import * as Yup from 'yup';
import { Request, Response } from "express";
import CategoryRepository from '../../repositories/CategoryRepository';
import { getCustomRepository } from 'typeorm';
 
class CategoryController{
    async store(req:Request, res:Response){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string()
          });
          if(!(await schema.isValid(req.body))){
            
            return res.status(400).json({ message: "erro de validação na entrada de valores! porfavor verifique o valor no campo" });
          }

          try {
            const categoryRepository = getCustomRepository(CategoryRepository)
      
            const { name,description } = req.body;
          
            const ExistCategory = await  categoryRepository.findOne({ name  })
          
      
            if ( ExistCategory) {
              
              return res.status(404).json({ message: 'Category already exists' })
            }
            const Category =  categoryRepository.create( req.body );
      
             await categoryRepository.save(Category)
        
            return res.status(201).json(Category)
         } catch (error) {
      
            return res.status(500).json({err: + error})
          }
    }

    async index(req: Request, res:Response){
        const Category = getCustomRepository(CategoryRepository)
        const ExistCategory =  await Category.find()
        return res.status(400).json({ExistCategory})
    };

    async getOne(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const categoryRepository = getCustomRepository(CategoryRepository)
            const ExistCategory = await categoryRepository.findOne({id})  
            
            if (ExistCategory) {
              const result = ExistCategory
              
              return res.status(200).json(result)
            }
            return res.status(404).json({ message: "Category does not found!" })
      
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
      
        const categoryRepository = getCustomRepository(CategoryRepository)
        const categoryOld= await categoryRepository.findOne({ id })
        
          const updatedOneCategory = 1
          const Category =  await categoryRepository.update({ id }, { name })
        
        if (Category.affected === updatedOneCategory) {
            
          const categoryUpdated = await categoryRepository.findOne({ id })
            
          return res.status(200).json({categoryOld,categoryUpdated})
        }
       return res.status(404).json({ message:"category not found to update "})
  
      } catch (error) {
          
          return res.status(500).json({ err: + error })
        }
    };  
    
    async delete(req:Request, res: Response){

        try {
            const { id } = req.params
          
            const categoryRepository = getCustomRepository(CategoryRepository)
            const ExistCategory = await categoryRepository.findOne({id})
          
            if (!ExistCategory) {
      
              return res.status(404).json({ message: "Category does not found " })
            }
      
              const deletedOneCategory = 1
              const Category =  await categoryRepository.delete({ id })
            
              if (Category.affected === deletedOneCategory) {
                const CategoryDeleted =  ExistCategory
      
                return res.status(200).json({ message:"this Category was deleted!"+ CategoryDeleted.name })
              }
          } catch (error) {
              return res.status(500).json({ err:  + error })
    }
}

}
export default new CategoryController;