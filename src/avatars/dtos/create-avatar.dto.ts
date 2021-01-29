import { IsBase64, IsNotEmpty } from 'class-validator';

class CreateAvatarDto {
  @IsBase64()
  @IsNotEmpty()
  public blob: string;
}

export default CreateAvatarDto;
