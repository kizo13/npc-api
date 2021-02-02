import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Foswig from 'foswig';
import NameListGeneratorFilter from './dtos/name-list-generator-filter.dto';
import NameGeneratorFilter from './dtos/name-generator-filter.dto';
import Name from './name.entity';
import GenderType from 'src/npcs/enums/gender-type.enum';

@Injectable()
export class NamesService {
  constructor(
    @InjectRepository(Name)
    private nameRepository: Repository<Name>,
  ) {}

  async generateList(filter: NameListGeneratorFilter): Promise<Array<string>> {
    const nameAlias = 'name';
    const cultureNames = await this.nameRepository
      .createQueryBuilder(nameAlias)
      .where(`"${nameAlias}".culture = :culture`, { culture: filter.culture })
      .getOne();

    const constraints = {
      minLength: 3,
      maxLength: 10,
      allowDuplicates: true,
    };
    const key = filter.gender === GenderType.MALE ? 'males' : 'females';
    const firstnames = cultureNames[key].split(',');
    const surnames = cultureNames.surnames.split(',');

    const generatedNames = [];
    const firstnamesChain = new Foswig(3, firstnames);
    const surnamesChain = new Foswig(3, surnames);
    const count = filter.count || 15;
    for (let i = 0; i < count; i++) {
      const generatedFirstnames = firstnamesChain.generate(constraints);
      const generatedSurnames = surnamesChain.generate(constraints);
      generatedNames.push(`${generatedFirstnames} ${generatedSurnames}`);
    }

    return generatedNames;
  }

  async generateOne(filter: NameGeneratorFilter): Promise<string> {
    const nameAlias = 'name';
    const cultureNames = await this.nameRepository
      .createQueryBuilder(nameAlias)
      .where(`"${nameAlias}".culture = :culture`, { culture: filter.culture })
      .getOne();

    const constraints = {
      minLength: 3,
      maxLength: 10,
      allowDuplicates: true,
    };
    const key = filter.gender === GenderType.MALE ? 'males' : 'females';
    const firstnames = cultureNames[key].split(',');
    const surnames = cultureNames.surnames.split(',');

    const firstnamesChain = new Foswig(3, firstnames);
    const generatedFirstnames = firstnamesChain.generate(constraints);
    const surnamesChain = new Foswig(3, surnames);
    const generatedSurnames = surnamesChain.generate(constraints);

    return `${generatedFirstnames} ${generatedSurnames}`;
  }
}
