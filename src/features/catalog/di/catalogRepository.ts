import type { CatalogRepository } from '../domain/interfaces/CatalogRepository'
import { catalogRepository as httpRepository } from '../data/catalogRepository'

export const catalogRepository: CatalogRepository = httpRepository
