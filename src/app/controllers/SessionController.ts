import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { compare } from 'bcrypt';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';
import authData from '../../config/auth';
import LoginRepository from '../../repositories/LoginRepository';
import ContactRepository from '../../repositories/ContactRepository';
import UserRepository from '../../repositories/UserRepository';

class SessionsController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      contact: Yup.string().required(),
      password: Yup.string().required()
    });
    if(!(await schema.isValid(req.body))){
      
      return res.status(400).json({ message: "erro de validação na entrada de valores! porfavor verifique o valor no campo" });
    }
    try {
      const loginRepository = getCustomRepository(LoginRepository);
      const contactRepository = getCustomRepository(ContactRepository);
      const userRepository = getCustomRepository(UserRepository);
       
      const { contact, password } = req.body;

      const contactExists = await contactRepository.findOne({
        where: { descricao: contact },
      });
      
      const user = await userRepository.findOne({
        where: { id: contactExists.userId.id },
      });
      
      if (!user) {
        return res.status(401).json({ error: 'Login inválido!' })};

      const login = await loginRepository.findOne({
        where: { contactId: contactExists.id },
      });

      if (!login) {
        return res.status(400).json({ error: 'Login ou senha inválido11!' });
      }

      const isValidPassword= await compare(password, login.password)
      
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Login ou senha inválido!' });
      }

      const token = jwt.sign({ session: { userId: login.contactId.userId.id} }, authData.key, {
        expiresIn: authData.expiresIn,
      });

      return res.status(200).json({
        token,
        user,
      });
    } catch (erro) {
      return res.status(500).json(erro);
    }
  }
}
export default new SessionsController();
