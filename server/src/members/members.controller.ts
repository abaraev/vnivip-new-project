import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {MembersService} from "./members.service";
import {CreateMemberDto} from "./dto/create-member.dto";
import {ImageValidationPipe} from "../pipes/image-validation.pipe";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {GetBySectionDto} from "./dto/get-by-section.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {SetPositionUpMemberDto} from "./dto/set-position-up-member.dto";
import {SetPositionDownMemberDto} from "./dto/set-position-down-member.dto";
import {GetMemberOneDto} from "./dto/get-member-one.dto";
import {ChangeFullNameMemberDto} from "./dto/change-fullName-member.dto";
import {ChangeJobNameMemberDto} from "./dto/change-jobName-member.dto";
import {ChangeStatusMemberDto} from "./dto/change-status-member.dto";
import {ChangeEmailMemberDto} from "./dto/change-email-member.dto";
import {ChangePhoneMemberDto} from "./dto/change-phone-member.dto";
import {DeleteAvatarMemberDto} from "./dto/delete-avatar-member.dto";
import {ChangeAvatarMemberDto} from "./dto/change-avatar-member.dto";
import {DeleteMemberDto} from "./dto/delete-member.dto";

@Controller('members')
export class MembersController {

    constructor(private membersService: MembersService) {}


    @Get('one')
    getOne(@Query() dto: GetMemberOneDto) {
        return this.membersService.getOne(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-fullName')
    changeFullName(@Body() dto: ChangeFullNameMemberDto) {
        return this.membersService.changeFullName(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-jobName')
    changeJobName(@Body() dto: ChangeJobNameMemberDto) {
        return this.membersService.changeJobName(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-status')
    changeStatus(@Body() dto: ChangeStatusMemberDto) {
        return this.membersService.changeStatus(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-email')
    changeEmail(@Body() dto: ChangeEmailMemberDto) {
        return this.membersService.changeEmail(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-phone')
    changePhone(@Body() dto: ChangePhoneMemberDto) {
        return this.membersService.changePhone(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('delete-avatar')
    deleteAvatar(@Body() dto: DeleteAvatarMemberDto) {
        return this.membersService.deleteAvatar(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('change-avatar')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
    ]))
    changeCover(@Body() dto: ChangeAvatarMemberDto,
                @UploadedFiles(
                    new ImageValidationPipe({
                        maxSize: 50,
                        fieldName: 'avatar',
                        types: ['jpeg', 'png', 'jpg'],
                    }),
                ) files: { avatar?: Express.Multer.File[] }) {
        return this.membersService.changeAvatar(dto, files);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Query() dto: DeleteMemberDto) {
        return this.membersService.delete(dto);
    }

    @Get()
    getAll() {
        return this.membersService.getAll();
    }


    @Get('departments')
    getDepartments() {
        return this.membersService.getDepartments();
    }


    @Get('section')
    getBySection(@Query() dto: GetBySectionDto) {
        return this.membersService.getBySection(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('position-up')
    setPositionUp(@Body() dto: SetPositionUpMemberDto) {
        return this.membersService.setPositionUp(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('position-down')
    setPositionDown(@Body() dto: SetPositionDownMemberDto) {
        return this.membersService.setPositionDown(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
    ]))
    create(@Body() dto: CreateMemberDto,
           @UploadedFiles(
               new ImageValidationPipe({
                   maxSize: 20,
                   fieldName: 'avatar',
                   types: ['jpeg', 'png', 'jpg'],
               }),
           ) files: { avatar?: Express.Multer.File[] }) {
        return this.membersService.create(dto, files);
    }
}
