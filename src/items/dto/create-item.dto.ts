//create-item.dto
import { IsNotEmpty, IsNumber, IsOptional, IsString /*,ValidationArguments*/} from "class-validator";
// const isNumberMessage = (validationArguments: ValidationArguments): string => {
//     return `${validationArguments.property}: ต้องเป็นตัวเลข`
//   }
export class CreateItemDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    // @IsNumber({}, { message: isNumberMessage})/
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsOptional()
    description: string;

    @IsOptional()
    contactMobileNo: string;

    createdby?: string;
}