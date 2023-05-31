import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../../models/category/category.entity';
import { ArticleEntity } from '../../../models/article/article.entity';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepo: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    categoryRepo = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  describe('getCount', () => {
    it('should return count of categories', async () => {
        jest.spyOn(categoryRepo, 'count').mockResolvedValue(Promise.resolve(5));
      
      const result = await categoryService.getCount();

      expect(result).toEqual(5);
    });
  });

  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      const mockCategories: CategoryEntity[] = [
        new CategoryEntity(),
        new CategoryEntity(),
        new CategoryEntity(),
      ];

      jest.spyOn(categoryRepo, 'find').mockResolvedValue(Promise.resolve(mockCategories));

      const result = await categoryService.getCategories();

      expect(result).toEqual(mockCategories);
    });

    it('should pass the correct options to find method', async () => {
      const spy = jest.spyOn(categoryRepo, 'find').mockResolvedValue(Promise.resolve([]));

      await categoryService.getCategories(2, 10);

      expect(spy).toHaveBeenCalledWith({
        order: {
          id: 'DESC',
        },
        skip: 10,
        take: 10,
      });
    });
  });

  describe('getOneCategory', () => {
    it('should return a category with articles relation', async () => {
      const categoryId = 1;
      const mockCategory = new CategoryEntity();
      mockCategory.articles = [
        new ArticleEntity(),
        new ArticleEntity(),
      ];

      jest
        .spyOn(categoryRepo, 'findOneOrFail')
        .mockResolvedValue(Promise.resolve(mockCategory));

      const result = await categoryService.getOneCategory(categoryId);

      expect(result).toEqual(mockCategory);
      expect(result.articles.length).toEqual(mockCategory.articles.length);
    });

    it('should throw an error when category is not found', async () => {
      const categoryId = 1;

      jest
        .spyOn(categoryRepo, 'findOneOrFail')
        .mockRejectedValue(new Error('Category not found'));

      await expect(
        categoryService.getOneCategory(categoryId),
      ).rejects.toThrowError('Category not found');
    });
  });
});
