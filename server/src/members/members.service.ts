import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Member} from "./members.model";
import {CreateMemberDto} from "./dto/create-member.dto";
import {FilesService} from "../files/files.service";
import {GetBySectionDto} from "./dto/get-by-section.dto";
import {Op} from "sequelize";
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

@Injectable()
export class MembersService {

    constructor(@InjectModel(Member) private membersRepository: typeof Member,
                private fileService: FilesService) {}

    async create(dto: CreateMemberDto, files: { avatar?: Express.Multer.File[] }) {
        const avatar = files?.avatar?.[0];

        const data: CreateMemberDto = {
            fullName: dto.fullName,
            jobName: dto.jobName,
            status: dto.status,
            section: dto.section,
            email: dto.email,
            phone: dto.phone,
        }

        const members = await this.membersRepository.findAll({ where: { section: data.section }});
        data.position = members.length;

        if (avatar) {
            data.avatar = await this.fileService.createImage(avatar);
        }

        return await this.membersRepository.create(data);
    }

    async getAll() {
        return await this.membersRepository.findAll();
    }

    async getBySection(dto: GetBySectionDto) {
        return await this.membersRepository.findAll({
            where: {
                section: dto.section,
            },
            order: [['createdAt', 'DESC']],
        })
    }

    async getDepartments() {
        return await this.membersRepository.findAll({
            where: {
                section: {
                    [Op.iLike]: `%DEPARTMENT%`
                },
            }
        })
    }

    async setPositionUp(dto: SetPositionUpMemberDto) {
        if (Number(dto.memberPosition) === 0) {
            throw new HttpException('The member is already at the very top', HttpStatus.BAD_REQUEST);
        }

        const currentPosition = Number(dto.memberPosition);
        const replaceablePosition = Number(dto.memberPosition) - 1;

        const replaceableMember = await this.membersRepository.findOne({ where: { section: dto.section, position: replaceablePosition }});
        const member = await this.membersRepository.findOne({ where: { section: dto.section, position: currentPosition }});

        if (!member) {
            throw new HttpException('member with the position and section not found', HttpStatus.BAD_REQUEST)
        }

        await member.update({ position: replaceablePosition })
        await replaceableMember.update({ position: currentPosition })


        return member;
    }

    async setPositionDown(dto: SetPositionDownMemberDto) {
        const members = await this.membersRepository.findAll({ where: { section: dto.section }})

        if (Number(dto.memberPosition) === members.length - 1) {
            throw new HttpException('The member is already at the very down', HttpStatus.BAD_REQUEST);
        }

        const currentPosition = Number(dto.memberPosition);
        const replaceablePosition = Number(dto.memberPosition) + 1;

        const replaceableMember = await this.membersRepository.findOne({ where: { section: dto.section, position: replaceablePosition }});
        const member = await this.membersRepository.findOne({ where: { section: dto.section, position: currentPosition }});

        if (!member) {
            throw new HttpException('member with the position and section not found', HttpStatus.BAD_REQUEST)
        }

        await member.update({ position: replaceablePosition })
        await replaceableMember.update({ position: currentPosition })


        return member;
    }

    async getOne(dto: GetMemberOneDto) {
        const member = await this.membersRepository.findOne({ where: { id: dto.memberId }});

        if (!member) {
            throw new HttpException('member not found', HttpStatus.BAD_REQUEST);
        }

        return member;
    }

    async changeFullName(dto: ChangeFullNameMemberDto) {
        const member = await this.membersRepository.findOne({ where: { id: dto.memberId }});

        if (!member) {
            throw new HttpException('member not found', HttpStatus.BAD_REQUEST);
        }

        await member.update({ fullName: dto.fullName });

        return member;
    }

    async changeJobName(dto: ChangeJobNameMemberDto) {
        const member = await this.membersRepository.findOne({ where: { id: dto.memberId }});

        if (!member) {
            throw new HttpException('member not found', HttpStatus.BAD_REQUEST);
        }

        await member.update({ jobName: dto.jobName });

        return member;
    }

    async changeStatus(dto: ChangeStatusMemberDto) {
        const member = await this.membersRepository.findOne({ where: { id: dto.memberId }});

        if (!member) {
            throw new HttpException('member not found', HttpStatus.BAD_REQUEST);
        }

        await member.update({ status: dto.status });

        return member;
    }

    async changeEmail(dto: ChangeEmailMemberDto) {
        const member = await this.membersRepository.findOne({ where: { id: dto.memberId }});

        if (!member) {
            throw new HttpException('member not found', HttpStatus.BAD_REQUEST);
        }

        await member.update({ email: dto.email });

        return member;
    }

    async changePhone(dto: ChangePhoneMemberDto) {
        const member = await this.membersRepository.findOne({ where: { id: dto.memberId }});

        if (!member) {
            throw new HttpException('member not found', HttpStatus.BAD_REQUEST);
        }

        await member.update({ phone: dto.phone });

        return member;
    }

    async deleteAvatar(dto: DeleteAvatarMemberDto) {
        const member = await this.membersRepository.findOne({ where: { id: dto.memberId }});

        if (!member) {
            throw new HttpException('member not found', HttpStatus.BAD_REQUEST);
        }

        if (!member.avatar) {
            return member;
        }

        await this.fileService.deleteImage(member.avatar);
        await member.update({ avatar: null });

        return member;
    }

    async changeAvatar(dto: ChangeAvatarMemberDto, files: { avatar?: Express.Multer.File[] }) {
        const avatar = files?.avatar?.[0];

        if (!avatar) {
            throw new HttpException('required avatar', HttpStatus.BAD_REQUEST);
        }

        const member = await this.membersRepository.findOne({ where: { id: dto.memberId }});

        if (!member) {
            throw new HttpException('member not found', HttpStatus.BAD_REQUEST);
        }

        if (member.avatar) {
            await this.fileService.deleteImage(member.avatar);
        }

        const fileName = await this.fileService.createImage(avatar);
        await member.update({ avatar: fileName });

        return {
            fileName,
        };
    }

    async delete(dto: DeleteMemberDto) {
        const member = await this.membersRepository.findOne({ where: { section: dto.section, position: dto.memberPosition }});

        if (!member) {
            throw new HttpException('the member not found', HttpStatus.BAD_REQUEST)
        }

        if (member.avatar) {
            await this.fileService.deleteImage(member.avatar);
        }

        await member.destroy();

        let haveDownMembers = true;
        let nextPosMember = member.position + 1;
        while (haveDownMembers) {
            const currentMember = await this.membersRepository.findOne({ where: { section: dto.section, position: nextPosMember }})

            if (!currentMember) {
                haveDownMembers = false;
            } else {
                await currentMember.update({ position: nextPosMember - 1 })
                nextPosMember += 1;
            }
        }

        const sectionAfter = await this.membersRepository.findAll({ where: { section: dto.section }});
        const sortedMembers = sectionAfter.sort((a, b) => a.position - b.position);

        return sortedMembers;
    }
}
