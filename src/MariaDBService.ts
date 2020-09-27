import { DefinitionsService, wrapService } from '@typeswarm/cli';
import { StrictService } from '@typeswarm/cli/lib/normalize';
import { setImageTag } from '@typeswarm/utils';

export interface MariaDBOptions {
    password: string;
    volume: string;
}

export const MariaDBService = ({
    password,
    volume,
}: MariaDBOptions): StrictService =>
    wrapService({
        command: [
            '--character-set-server=utf8mb4',
            '--collation-server=utf8mb4_unicode_ci',
        ],
        environment: {
            MYSQL_ROOT_PASSWORD: password,
        },
        volumes: [
            {
                type: 'volume',
                source: volume,
                target: '/var/lib/mysql',
            },
        ],
    })
        .with(
            setImageTag({
                image: 'mariadb',
                tag: '10.4.12',
            })
        )
        .value();
