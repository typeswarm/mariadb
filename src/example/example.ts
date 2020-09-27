import {
    ComposeSpecification,
    mergeComposeConfigurations,
} from '@typeswarm/cli';
import { MariaDB } from '../MariaDB';

let spec: ComposeSpecification = {
    version: '3.7',
};

spec = mergeComposeConfigurations(
    spec,
    MariaDB({
        credentials: [
            {
                database: 'foo',
                user: 'foo_user',
                password: '123',
            },
        ],
        password: 'toor',
        serviceName: 'db',
        volume: 'mariadb_data',
    })
);

export { spec };
