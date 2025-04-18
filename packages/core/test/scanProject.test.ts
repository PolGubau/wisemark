import fg from 'fast-glob'
import { readFile } from 'node:fs/promises'
import { type MockedFunction, beforeEach, describe, expect, it, vi } from 'vitest'
import { scanFile } from '../src/scanner/scanFile'
import { scanProject } from '../src/scanner/scanProject'
  
// Mock dependencies
vi.mock('fast-glob', () => ({
  default: vi.fn(),
}))
vi.mock('node:fs/promises', () => ({
  readFile: vi.fn(),
}))
vi.mock('../scanner/scanFile', () => ({
  scanFile: vi.fn(),
}))
 
const mockedFg = fg as unknown as MockedFunction<typeof fg>
const mockedReadFile = readFile as unknown as MockedFunction<typeof readFile>
const mockedScanFile = scanFile as unknown as MockedFunction<typeof scanFile>

describe('scanProject', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns empty array when no files match', async () => {
    mockedFg.mockResolvedValueOnce([])

    const result = await scanProject('/base/path')

    expect(result).toEqual([])
    expect(mockedFg).toHaveBeenCalledWith('**/*.{ts,tsx,js,jsx,mjs,cjs}', {
      cwd: '/base/path',
      ignore: ['node_modules', 'dist', 'build', '**/*.d.ts'],
      absolute: true,
    })
  })



  it('honors custom extensions and ignore patterns', async () => {
    mockedFg.mockResolvedValueOnce([])

    await scanProject('/some/dir', { extensions: ['js'], ignore: ['custom/**'] })

    expect(mockedFg).toHaveBeenCalledWith('**/*.{js}', {
      cwd: '/some/dir',
      ignore: ['custom/**'],
      absolute: true,
    })
  })
})