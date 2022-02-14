import { Router } from "express";
import multer from 'multer';
import { multerconfig } from "./config/multer";
import { Request, Response } from "express";
import {
      classe_controller, disciplina_controller, curso_controller,
      endereco_controller, profissionalismo_controller, Permissao_controller,
      role_controller, user_controller, contact_controller, login_controller,
      session_controller, categoria_controller, tes, typefile_controller, school_controller,
      file_controller
} from "./app/controllers";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
      return res.status(400).json({ message: "running well" });
});

const upload = multer(multerconfig);

routes.post('/file/:typeId/:categoryId', upload.single('file'), file_controller.store)
routes.get('/files', file_controller.index);
routes.get('/file/:id', file_controller.getOne);
routes.put('/file/:id', file_controller.update);
routes.delete('/file/:id', file_controller.delete);

routes.post('/school', school_controller.store);
routes.get('/schools', school_controller.index);
routes.get('/school/:id', school_controller.getOne);
routes.put('/school/:id', school_controller.update);
routes.delete('/school/:id', school_controller.delete);

routes.post('/typefile', typefile_controller.store);
routes.get('/typefiles', typefile_controller.index);
routes.get('/typefile/:id', typefile_controller.getOne);
routes.put('/typefile/:id', typefile_controller.update);
routes.delete('/typefile/:id', typefile_controller.delete);

routes.post('/session', session_controller.store);

routes.post('/login', login_controller.store);
routes.get('/logins', login_controller.index);
routes.get('/login/:id', login_controller.getOne);
routes.put('/login/:id', login_controller.update);

routes.post('/contact', contact_controller.store);
routes.get('/contacts', contact_controller.index);
routes.get('/contact/:id', contact_controller.getOne);
routes.put('/contact/:id', contact_controller.update);
routes.delete('/contact/:id', contact_controller.delete);

routes.post('/test', tes.store);
routes.get('/tests', tes.index);

routes.post('/user', user_controller.store);
routes.get('/users', user_controller.index);
routes.get('/user/:id', user_controller.getOne);
routes.put('/user/:id', user_controller.update);
routes.delete('/user/:id', user_controller.delete);

routes.post('/role', role_controller.store);
routes.get('/roles', role_controller.index);
routes.get('/role/:id', role_controller.getOne);
routes.put('/role/:id', role_controller.update);
routes.delete('/role/:id', role_controller.delete);

routes.post('/permissao', Permissao_controller.store);
routes.get('/permissaos', Permissao_controller.index);
routes.get('/permissao/:id', Permissao_controller.getOne);
routes.put('/permissao/:id', Permissao_controller.update);
routes.delete('/permissao/:id', Permissao_controller.delete);

routes.post('/profissao', profissionalismo_controller.store);
routes.get('/profissaos', profissionalismo_controller.index);
routes.get('/profissao/:id', profissionalismo_controller.getOne);
routes.put('/profissao/:id', profissionalismo_controller.update);
routes.delete('/profissao/:id', profissionalismo_controller.delete);

routes.post('/endereco', endereco_controller.store);
routes.get('/enderecos', endereco_controller.index);
routes.get('/endereco/:id', endereco_controller.getOne);
routes.put('/endereco/:id', endereco_controller.update);
routes.delete('/endereco/:id', endereco_controller.delete);

routes.post('/classe', classe_controller.store);
routes.get('/classes', classe_controller.index);
routes.get('/classe/:id', classe_controller.getOne);
routes.put('/classe/:id', classe_controller.update);
routes.delete('/classe/:id', classe_controller.delete);

routes.post('/disciplina', disciplina_controller.store);
routes.get('/disciplinas', disciplina_controller.index);
routes.get('/disciplina/:id', disciplina_controller.getOne);
routes.put('/disciplina/:id', disciplina_controller.update);
routes.delete('/disciplina/:id', disciplina_controller.delete);

routes.post('/curso', curso_controller.store);
routes.get('/cursos', curso_controller.index);
routes.get('/curso/:id', curso_controller.getOne);
routes.put('/curso/:id', curso_controller.update);
routes.delete('/curso/:id', curso_controller.delete);

routes.post('/categoria', categoria_controller.store);
routes.get('/categorias', categoria_controller.index);
routes.get('/categoria/:id', categoria_controller.getOne);
routes.put('/categoria/:id', categoria_controller.update);
routes.delete('/categoria/:id', categoria_controller.delete);

export default routes;
