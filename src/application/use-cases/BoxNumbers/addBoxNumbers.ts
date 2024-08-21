import { Error } from "../../../domain/entities/Error";
import { BoxNumberRepository } from "../../../domain/repositories/BoxNumberRepositories";
import { createdBoxNumbers } from "../../../UI/types/boxNumbers/BoxNumberResponse";

export class addBoxNumbers {
  private boxNumberRepository: BoxNumberRepository;

  constructor(boxNumberRepository: BoxNumberRepository) {
    this.boxNumberRepository = boxNumberRepository;
  }

  async execute(amount: number): Promise<createdBoxNumbers | Error> {
    const createBoxNumbers = await this.boxNumberRepository.addBoxNumbers(
      amount
    );
    return createBoxNumbers;
  }
}
