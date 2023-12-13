import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';
import { instanceToInstance } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    if (!request.file) throw new AppError('Please provide a file', 400);

    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(instanceToInstance(user));
  }
}
