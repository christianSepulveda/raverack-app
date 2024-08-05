import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { Error } from "../../../domain/entities/Error";
import { BoxNumberRepository } from "../../../domain/repositories/BoxNumberRepositories";

export class getAllBoxNumbers {
  private boxNumberRepository: BoxNumberRepository;

  constructor(boxNumberRepository: BoxNumberRepository) {
    this.boxNumberRepository = boxNumberRepository;
  }

  async execute(): Promise<BoxNumber[] | Error> {
    const boxNumbers = await this.boxNumberRepository.getAllBoxNumbers();
    return boxNumbers;
  }
}
