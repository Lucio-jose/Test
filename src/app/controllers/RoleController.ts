import { Request, Response } from "express";
import * as Yup from 'yup';
import { getCustomRepository } from "typeorm";
import RoleRepository from "../../repositories/RoleRepository";
import PermissaoRepository from "../../repositories/PermissaoRepository";
 
class RoleController {
    async store(req: Request, res: Response) {
        const schema = Yup.object().shape({
            descricao: Yup.string().required(),
            permissaoId: Yup.array().required(),
        }); 
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                message: 'erro de validação na entrada de valores!',
            });
        }
        try {
            const { descricao, permissaoId } = req.body

            const roleRepository = getCustomRepository(RoleRepository)
            const Exist = await roleRepository.findOne({ where: { descricao } })
            const permissao = getCustomRepository(PermissaoRepository)
            const ExistPermissao = await permissao.findByIds(permissaoId)


            if (Exist) {
                return res.status(400).json({ message: "Role já Exist" })
            }
            if (!ExistPermissao) {
                return res.status(404).json({ message: "Permissao inexistente" })
            }

            const Role = roleRepository.create({
                descricao,
                permissaoId: ExistPermissao
            })
            const result = await roleRepository.save(Role);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async index(req: Request, res: Response) {
        try {
            const roleRepository = getCustomRepository(RoleRepository);
            const existRole = await roleRepository.find();
            return res.status(200).json(existRole);
        } catch (error) {
            return res.status(404).json("erro" + error);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const roleRepository = getCustomRepository(RoleRepository);
            const existRole = await roleRepository.findOne(id);
            if (existRole) {
                const result = existRole;
                return res.status(400).json(result);
            }
            return res.status(402).json({ message: 'Role inexistente!' });
        } catch (error) {
            return res.status(404).json("erro" + error);
        }
    }


    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                descricao, permissaoId
            } = req.body;
            const roleRepository = getCustomRepository(RoleRepository);
            
            const Permissao = getCustomRepository(PermissaoRepository)
            const ExistPermissao = await Permissao.find()

            if(!ExistPermissao){
                return res.status(404).json({message:"Não existe essa permissão"})
            }
            const RoleOld = await roleRepository.findOne(id);
            const updatedOneRole = 1;
            const Role = await roleRepository.update({ id }, {

                descricao,
                permissaoId
            }

            );
            if (Role.affected === updatedOneRole) {
                const RoleUpdated = await roleRepository.findOne({ id });
                return res.status(200).json({ RoleOld, RoleUpdated });
            }
            return res.status(404).json({ message: 'Role not found to update' });
        } catch (error) {
            return res.status(500).json({ err: +error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const roleRepository = getCustomRepository(RoleRepository);
            const existRole = await roleRepository.findOne({ id });
            if (!existRole) {
                return res.status(404).json({ message: 'Role does not found' });
            }
            const deletedOneRole = 1;
            const Role = await roleRepository.delete({ id });
            if (Role.affected === deletedOneRole) {
                const RoleDeleted = existRole;
                return res
                    .status(200)
                    .json({ message: 'thisRole was deleted! ' + RoleDeleted.descricao });
            }
        } catch (error) {
            return res.status(500).json({ err: +error });
        }
    }
}
export default new RoleController;