import { IsString } from 'class-validator';

class FindOneBaHashParams {
  @IsString()
  hash: string;
}

export default FindOneBaHashParams;
