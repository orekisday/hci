import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './services/user.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { DataService } from './services/data.service';
import { AddData } from './dto/add-data.dto';

@ApiTags('Users for admin')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly dataService: DataService,
  ) {}

  @ApiOperation({ summary: 'Get list of all users' })
  @Get()
  async getAll() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @Get('get/profile')
  async getProfile(@Req() req) {
    return await this.userService.get(+req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user prediction' })
  @Post('get/prediction')
  async getPrediction(@Req() req, @Body() body: AddData) {
    return await this.dataService.getUserPrediction(+req.user.id, body);
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.userService.get(id);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
