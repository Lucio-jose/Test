import * as Yup from 'yup';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { FileRepository } from '../../repositories/FileRepository';
import TypeFileRepository from '../../repositories/TypeFileRepository';
import CategoryRepository from '../../repositories/CategoryRepository';

class FileController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      path: Yup.string(),
      typeId: Yup.string(),
      categoryId: Yup.string(),
      schoolId: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro de validação! verifique se  os dados então correctos' });
    }
    try {
      const typeFileRepository = getCustomRepository(TypeFileRepository);
      const fileRepository = getCustomRepository(FileRepository);
      const categoryRepository = getCustomRepository(CategoryRepository);

      const { typeId, categoryId, schoolId } = req.params;
      const { originalname: name, filename: path } = req.file
      const existTypeFile = await typeFileRepository.findOne({ where: { id: typeId } });
      var existCategory=await categoryRepository.findOne({ where: { id: categoryId } });

      if (!existTypeFile) {
        return res.status(404).json({ message: 'Type Not Exists!' });
      }
      if (!existCategory) {
        return res.status(404).json({ message: 'Category Not Exists!' });
      }

      const file = fileRepository.create({
        name,
        path,
        typeId: existTypeFile,
        categoryId:existCategory,
      });
      await fileRepository.save(file);
      return res.status(201).json(file);
    } catch (error) {
      return res.status(500).json({ error: 'error -->' + error });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const fileRepository = getCustomRepository(FileRepository);
      const file = await fileRepository.find();
      return res.status(200).json(file);
    } catch (error) {
      return res.status(500).json({ error: 'error' });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const fileRepository = getCustomRepository(FileRepository);
      const existFile = await fileRepository.findOne({ where: { id: id } });
      if (existFile) {
        const result = existFile;
        return res.status(200).json(result);
      }
      return res.status(404).json({ message: 'School not found!' });
    } catch (error) {
      return res.status(500).json({ error: 'error' });
    }
  }

  async update(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      path: Yup.string(),
      typeId: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'error de validation!' });
    }
    try {
      const fileRepository = getCustomRepository(FileRepository);
      const { id } = req.params;
      const { originalname: name, filename: path } = req.file;
      const typeFileRepository = getCustomRepository(TypeFileRepository);
      const fileOld = await fileRepository.findOne({ id });
      if (!fileOld) {
        return res.status(404).json({ message: 'File not found ' });
      }
      const updatedOneFile = 1;
      const file = await fileRepository.update(
        {
          id,
        },
        {
          name,
          path,
        }
      );
      if (file.affected === updatedOneFile) {
        const fileUpdated = await fileRepository.findOne({ id });
        return res.status(200).json({ fileOld, fileUpdated });
      }
    } catch (error) {
      return res.status(500).json({ error: 'error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const fileRepository = getCustomRepository(FileRepository);
      const existFile = await fileRepository.findOne({ id });
      if (!existFile) {
        return res.status(404).json({ message: 'File not found' });
      }
      const deletedOneFile = 1;
      const file = await fileRepository.delete({ id });
      if (file.affected === deletedOneFile) {
        const fileDeleted = existFile;
        return res.status(200).json({ message: 'File deleted with success!' + fileDeleted.name });
      }
    } catch (error) {
      return res.status(500).json({ error: 'error' });
    }
  }
}

export default new FileController();
