import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MetaService } from './meta.service';

describe('MetaService', () => {
  let service: MetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [MetaService],
    }).compile();

    service = module.get<MetaService>(MetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
