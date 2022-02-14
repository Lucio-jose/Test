import { Request, Response } from "express";
import * as Yup from 'yup';
import { getCustomRepository } from "typeorm";
import CursoRepository from "../../repositories/CursoRepository";
import DisciplinaRepository from "../../repositories/DisciplinaRepository";
import ClasseRepository from "../../repositories/ClasseRepository";
import ProfissionalismoRepository from "../../repositories/ProfissionalismoRepository";
 
class CursoController{
    async store(req:Request, res:Response){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            classeId: Yup.array().required(),
            disciplinaId: Yup.array().required(),
            profissionalismoId: Yup.array().required()
          });
          if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
              message: 'erro de validação na entrada de valores!',
            });
          }
        try{
            const{name,description,disciplinaId,classeId,profissionalismoId}=req.body
    
            const cursoRepository = getCustomRepository(CursoRepository)
            const Exist = await cursoRepository.findOne({where:{name}})
            const classe = getCustomRepository(ClasseRepository)
            const ExistClasse = await classe.findByIds(classeId)
            const disciplina = getCustomRepository(DisciplinaRepository)
            const ExistDisciplina = await disciplina.findByIds(disciplinaId)
            const profissionalismo = getCustomRepository(ProfissionalismoRepository)
            const ExistProfissao = await profissionalismo.findByIds(profissionalismoId)
            
            if(Exist){
                return res.status(400).json({message:"Curso já Exist"})
            }
            if(!ExistClasse){
                return res.status(404).json({message:"Classe inexistente"})
            }
    
            if(!ExistDisciplina){
                return res.status(404).json({message:"Disciplina inexistente"})
            }
    
            if(!ExistProfissao){
              return res.status(404).json({message:"Profissionalismo not founds"})
            }

           const Curso= cursoRepository.create({
               name,
               description,
               disciplinaId:ExistDisciplina,
               classeId:ExistClasse,
               profissionalismoId:ExistProfissao
           })
            const result = await cursoRepository.save(Curso);
            return res.status(201).json(result);
        }catch(error){
            return res.status(500).json(error)
        }
    }
    
    async index(req:Request, res:Response){
        try{
            const cursoRepository = getCustomRepository(CursoRepository);
            const existCurso = await cursoRepository.find();
            return res.status(200).json(existCurso);
        } catch (error) {
          return res.status(404).json("erro"+error);
        }
    }
    
    async getOne(req:Request, res:Response){
        try {
            const {id} = req.params;
            const cursoRepository = getCustomRepository(CursoRepository);
            const existCurso = await cursoRepository.findOne(id);
            if (existCurso) {
              const result = existCurso;
              return res.status(400).json(result);
            }
            return res.status(402).json({ message: 'Curso inexistente!' });
            } catch (error) {
            return res.status(404).json("erro"+error);
          }
    }
    
    
    async update(req:Request, res:Response){
        try {
            const { id } = req.params;
            const {         
                name,description,disciplinaId,classeId, profissionalismoId
              } = req.body;
            const cursoRepository = getCustomRepository(CursoRepository);
            const CursoOld = await cursoRepository.findOne(id);
            const updatedOneCurso = 1;
            const Curso = await cursoRepository.update({ id }, {
                name,description,disciplinaId,classeId,profissionalismoId
            });
            if (Curso.affected === updatedOneCurso) {
              const CursoUpdated = await cursoRepository.findOne({ id });
              return res.status(200).json({ CursoOld, CursoUpdated });
            }
            return res.status(404).json({ message: 'Curso not found to update' });
          } catch (error) {
            return res.status(500).json({ err: +error });
          }
    }
    
    async delete(req:Request, res:Response){
        try {
            const { id } = req.params;
            const cursoRepository = getCustomRepository(CursoRepository);
            const existCurso = await cursoRepository.findOne({ id });
            if (!existCurso) {
              return res.status(404).json({ message: 'Curso does not found' });
            }
            const deletedOneCurso = 1;
            const Curso = await cursoRepository.delete({ id });
            if (Curso.affected === deletedOneCurso) {
              const CursoDeleted = existCurso;
              return res
                .status(200)
                .json({ message: 'this curso was deleted! ' + CursoDeleted.name });
            }
          } catch (error) {
            return res.status(500).json({ err: +error });
          }
    }
}
export default new CursoController;