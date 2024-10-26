//item.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Item, ItemStatus } from './entities/item.entity';
import { EntityManager, In, Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  create(createItemDto: CreateItemDto) {
    return this.itemRepository.save(createItemDto);
  }

  searchByIds(ids: number[]) {
    return this.itemRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  searchByIdsNativeQuery(ids: number[]) {
    const placeholders = ids.map((_, index) => `$${index + 1}`).join(',');
    const query = `SELECT * FROM item WHERE id IN (${placeholders})`;
    //console.log(query)
    return this.itemRepository.query(query, ids);
  }

  findAll({ page, limit }: { page: number; limit: number }) {
    // ถ้าไม่ระบุ limit ให้ดึงทั้งหมด
    if (!limit) {
      return this.itemRepository.find({
        order: {
          updatedate: 'DESC',
          id: 'ASC'
        }
      });
    }
    // ถ้าระบุ limit ให้ทำ pagination ตามปกติ
    const skip = (page - 1) * limit;
    return this.itemRepository.find({
      skip,
      take: limit,
      order: {
        updatedate: 'DESC',
        id: 'ASC'
      }
    });
  }

  findAllByTitle(
    title: string,
    { page, limit }: { page: number; limit: number },
  ) {
    if(!limit){
      return this.itemRepository
      .createQueryBuilder('item')
      .where('item.title LIKE :title', { title: `%${title}%` })
      .orderBy('item.updatedate', 'DESC')
      .orderBy('item.id', 'ASC')  
      .getMany();
    }
    const skip = (page - 1) * limit;
    return this.itemRepository
      .createQueryBuilder('item')
      .where('item.title LIKE :title', { title: `%${title}%` })
      .orderBy('item.updatedate', 'DESC')
      .orderBy('item.id', 'ASC')  
      .skip(skip)
      .take(limit)
      .getMany();
  }

  findOne(id: number) {
    return this.itemRepository.findOneBy({ id });
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemRepository.save({
      id,
      ...updateItemDto,
    });
  }

  async remove(id: number) {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Not found: id=${id}`);
    }

    return this.itemRepository.delete({ id });
  }

  async updateItemStatus(id: number, status: ItemStatus) {
    // id should not empty
    if (!id) {
      throw new NotFoundException(`id should not empty`);
    }

    // item should found
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`not found: id=${id}`);
    }
    // Update item status
    item.status = status; // Use the status passed from the controller
    return await this.itemRepository.save(item);
  }
}
