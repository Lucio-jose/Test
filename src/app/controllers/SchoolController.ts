import { Request, Response } from "express";
import * as Yup from 'yup';
import { getCustomRepository } from "typeorm";
import SchoolRepository from "../../repositories/SchoolRepository";
import CursoRepository from "../../repositories/CursoRepository";
 
class SchoolController{
    async store(req:Request, res:Response){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description:Yup.string(),
            email: Yup.string().required(),
            nif: Yup.string().required(),
            numberStudents: Yup.string().required(),
            numberEmployee: Yup.string(),
            typeSchool:Yup.string().required(),
            enderecoId:Yup.string().required(), 
            cursoId: Yup.array(),
            userId: Yup.string().required()
          });
          if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
              message: 'erro de validação na entrada de valores!',
            });
          }
        try{
            const{name,description,email,nif,numberStudents,numberEmployee,typeSchool,enderecoId,cursoId,userId}=req.body
    
            const schoolRepository = getCustomRepository(SchoolRepository)
            const Exist = await schoolRepository.findOne({where:{nif}})

            const curso = getCustomRepository(CursoRepository)
            const ExistCurso = await curso.findByIds(cursoId)

            if(Exist){
                return res.status(400).json({message:"Escola já Exist"})
            }
            if(!ExistCurso){
                return res.status(404).json({message:"Curso inexistente"})
            }

           const School= schoolRepository.create({
            name,
            description,
            email,
            nif,
            numberStudents,
            numberEmployee,
            typeSchool,
            enderecoId,
            cursoId:ExistCurso,
            userId
           })
            const result = await schoolRepository.save(School);
            return res.status(201).json(result);
        }catch(error){
            return res.status(500).json(error)
        }
    }
    
    async index(req:Request, res:Response){
        try{
            const schoolRepository = getCustomRepository(SchoolRepository);
            const existSchool = await schoolRepository.find();
            return res.status(200).json(existSchool);
        } catch (error) {
          return res.status(404).json("erro"+error);
        }
    }
    
    async getOne(req:Request, res:Response){
        try {
            const {id} = req.params;
            const schoolRepository = getCustomRepository(SchoolRepository);
            const existSchool = await schoolRepository.findOne(id);
            if (existSchool) {
              const result = existSchool;
              return res.status(400).json(result);
            }
            return res.status(402).json({ message: 'School inexistente!' });
            } catch (error) {
            return res.status(404).json("erro"+error);
          }
    }
    
    
    async update(req:Request, res:Response){
        try {
            const { id } = req.params;
            const {         
                name,
                description,
                email,
                nif,
                numberStudents,
                numberEmployee,
                typeSchool,
                enderecoId,
                cursoId,
                userId
              } = req.body;
            const schoolRepository = getCustomRepository(SchoolRepository);
            const SchoolOld = await schoolRepository.findOne(id);
            const updatedOneSchool = 1;
            const School = await schoolRepository.update({ id }, {
                name,
                description,
                email,
                nif,
                numberStudents,
                numberEmployee,
                typeSchool,
                enderecoId,
                cursoId,
                userId
            });
            if (School.affected === updatedOneSchool) {
              const SchoolUpdated = await schoolRepository.findOne({ id });
              return res.status(200).json({ SchoolOld, SchoolUpdated });
            }
            return res.status(404).json({ message: 'School not found to update' });
          } catch (error) {
            return res.status(500).json({ err: +error });
          }
    }
    
    async delete(req:Request, res:Response){
        try {
            const { id } = req.params;
            const schoolRepository = getCustomRepository(SchoolRepository);
            const existSchool = await schoolRepository.findOne({ id });
            if (!existSchool) {
              return res.status(404).json({ message: 'School does not found' });
            }
            const deletedOneSchool = 1;
            const School = await schoolRepository.delete({ id });
            if (School.affected === deletedOneSchool) {
              const SchoolDeleted = existSchool;
              return res
                .status(200)
                .json({ message: 'this School was deleted! ' + SchoolDeleted.name });
            }
          } catch (error) {
            return res.status(500).json({ err: +error });
          }
    }
}
export default new SchoolController;