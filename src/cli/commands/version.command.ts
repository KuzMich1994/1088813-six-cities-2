import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {Command} from './command.interface.js';
import chalk from 'chalk';

type PackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json',
  ) {
  }

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(chalk.bgYellow.whiteBright(version));
    } catch (error: unknown) {
      console.error(`${chalk.redBright('Failed to read version from')} ${chalk.bgRedBright.whiteBright(this.filePath)}`);

      if (error instanceof Error) {
        console.error(chalk.bgRedBright.whiteBright(error.message));
      }
    }
  }
}
