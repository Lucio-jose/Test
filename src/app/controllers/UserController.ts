import * as Yup from 'yup';
import { Request, Response } from "express";
import UserRepository from '../../repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import EnderecoRepository from '../../repositories/EnderecoRepository';
import RoleRepository from '../../repositories/RoleRepository';

class UserController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      dateBorn: Yup.string().required(),
      bi: Yup.string(),
      enderecoId: Yup.string().required(),
      roleId: Yup.string()
    });

    try {
      const userRepository = getCustomRepository(UserRepository)

      const { name, dateBorn, bi, enderecoId, roleId } = req.body;

      if (!(await schema.isValid({ name, dateBorn, enderecoId, roleId }))) {

        return res.status(400).json({ message: "erro de validação na entrada de valores! porfavor verifique o valor no campo" });
      }

      const Exist = await userRepository.findOne({ where:{ticket:bi} })

      const enderecoRepository = getCustomRepository(EnderecoRepository)
      const ExistEndereco = await enderecoRepository.findOne({ where: { id: enderecoId } })
      const roleRepository = getCustomRepository(RoleRepository)
      const ExistRole = await roleRepository.findOne({ where: { id: roleId } })

      if (Exist) {
        return res.status(404).json({ message: 'User already exists' })
      }
      if (!ExistEndereco) {
        return res.status(404).json({ message: 'Endereco already exists' })
      }
      if (!ExistRole && roleId !== undefined) {
        return res.status(404).json({ message: 'Role already exists' })
      }

      if(bi.length<14){
        return res.status(404).json({ message: 'Número do Bilhete inválido' })
      }
      const user = userRepository.create({
        ticket:bi,
        name,
        dateBorn,
        enderecoId,
        roleId
      });

const result= await userRepository.save(user)

      return res.status(201).json({result})
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async index(req: Request, res: Response) {
    const User = getCustomRepository(UserRepository)
    const ExistUser = await User.find()
    return res.status(400).json({ ExistUser })
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userRepository = getCustomRepository(UserRepository)
      const ExistUser = await userRepository.findOne({ id })

      if (ExistUser) {
        const result = ExistUser

        return res.status(200).json(result)
      }
      return res.status(404).json({ message: "User does not found!" })

    } catch (error) {
      return res.status(500).json({ err: + error })
    }
  };

  async update(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      dateBorn: Yup.string().required(),
      bi: Yup.string().required(),
      enderecoId: Yup.string().required(),
      roleId: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {

      return res.status(400).json({ message: "erro de validação na entrada de valores! verifique o valor no campo" });
    }

    try {
      const { id } = req.params
      const { name, dateBorn, enderecoId, bi, roleId } = req.body

      const userRepository = getCustomRepository(UserRepository)
      const userOld = await userRepository.findOne({ id })

      const enderecoRepository = getCustomRepository(EnderecoRepository)
      const ExistEndereco = await enderecoRepository.findOne({ where: { id: enderecoId } })
      const roleRepository = getCustomRepository(RoleRepository)
      const ExistRole = await roleRepository.findOne({ where: { id: roleId } })

      if (!ExistEndereco) {
        return res.status(404).json({ message: 'Endereco already exists' })
      }
      if (!ExistRole) {
        return res.status(404).json({ message: 'Role already exists' })
      }

      const updatedOneUser = 1
      const User = await userRepository.update({ id }, { name, dateBorn, enderecoId, roleId })

      if (User.affected === updatedOneUser) {

        const userUpdated = await userRepository.findOne({ id })

        return res.status(200).json({ userOld, userUpdated })
      }
      return res.status(404).json({ message: "User not found to update " })

    } catch (error) {

      return res.status(500).json({ err: + error })
    }
  };

  async delete(req: Request, res: Response) {

    try {
      const { id } = req.params

      const userRepository = getCustomRepository(UserRepository)
      const ExistUser = await userRepository.findOne({ id })

      if (!ExistUser) {

        return res.status(404).json({ message: "User does not found " })
      }

      const deletedOneUser = 1
      const User = await userRepository.delete({ id })

      if (User.affected === deletedOneUser) {
        const userDeleted = ExistUser

        return res.status(200).json({ message: "this User was deleted!" + userDeleted })
      }
    } catch (error) {
      return res.status(500).json({ err: + error })
    }
  }

}
export default new UserController;