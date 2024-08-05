import { BoxNumber } from "../../../domain/entities/BoxNumber";
import { Error } from "../../../domain/entities/Error";
import { BoxNumberRepository } from "../../../domain/repositories/BoxNumberRepositories";

export class getBoxNumberDetails {
  private boxNumberRepository: BoxNumberRepository;

  constructor(boxNumberRepository: BoxNumberRepository) {
    this.boxNumberRepository = boxNumberRepository;
  }

  async execute(boxNumber: string): Promise<BoxNumber[] | Error> {
    const boxNumbers = await this.boxNumberRepository.getBoxNumberDetails(
      boxNumber
    );
    return boxNumbers;
  }
}
