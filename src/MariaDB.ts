import { ComposeSpecification, DefinitionsConfig } from '@typeswarm/cli';
import { MariaDBOptions, MariaDBService } from './MariaDBService';
import { DatabaseCreatorOptions, DatabaseCreator } from './DatabaseCreator';
import immer from 'immer';

export type MariaDBPackageOptions = MariaDBOptions &
    DatabaseCreatorOptions & {
        serviceName: string;
    };

export const MariaDB = (
    options: MariaDBPackageOptions
): ComposeSpecification => {
    const dbService = MariaDBService(options);

    const dbCreatorConfig = DatabaseCreator(options);
    const dbCreatorConfigName = `${options.serviceName}_initsql`;

    const spec: ComposeSpecification = {
        services: {
            [options.serviceName]: immer((dbService) => {
                dbService.configs = dbService.configs || [];
                dbService.configs.push({
                    source: dbCreatorConfigName,
                    target: '/createDatabases.sql',
                });
                dbService.command = ['--init-file', '/createDatabases.sql'];
            })(dbService),
        },
        configs: {
            [dbCreatorConfigName]: dbCreatorConfig,
        },
    };

    return spec;
};
