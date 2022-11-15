import { literal, ModelAttributes, QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const CURRENT_TIMESTAMP = 'CURRENT_TIMESTAMP';
    await queryInterface.createTable('cinema_hall', {
        id: { type: 'integer', primaryKey: true, autoIncrement: true, },
        name: { type: DataType.STRING },
        createdAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
        updatedAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
    } as ModelAttributes);

    await queryInterface.createTable('show_hall', {
        id: { type: 'integer', primaryKey: true, autoIncrement: true, },
        name: { type: DataType.STRING },
        createdAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
        updatedAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
    } as ModelAttributes);

    await queryInterface.createTable('movie', {
        id: { type: 'integer', primaryKey: true, autoIncrement: true, },
        name: { type: 'varchar' },
        duration: { type: DataType.INTEGER },
        createdAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
        updatedAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
    } as ModelAttributes);

    await queryInterface.createTable('movie_show', {
        id: { type: 'integer', primaryKey: true, autoIncrement: true, },
        showHallId: {
            type: DataType.INTEGER,
            allowNull: true,
            references: {
                model: {
                    tableName: 'show_hall',
                },
                key: 'id',
            },
            onDelete: 'cascade',
        },
        movieId: {
            type: DataType.INTEGER,
            allowNull: true,
            references: {
                model: {
                    tableName: 'movie',
                },
                key: 'id',
            },
            onDelete: 'cascade',
        },
        perSeatPrice: { type: DataType.NUMBER },
        movieTime: { type: DataType.DATE },
        createdAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
        updatedAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
    } as ModelAttributes);

    await queryInterface.createTable('booking_ticket', {
        id: { type: 'integer', primaryKey: true, autoIncrement: true, },
        movieShowId: {
            type: DataType.INTEGER,
            allowNull: true,
            references: {
                model: {
                    tableName: 'movie_show',
                },
                key: 'id',
            },
            onDelete: 'cascade',
        },
        createdAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
        updatedAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
    } as ModelAttributes);

    await queryInterface.createTable('booking_seat', {
        id: { type: 'integer', primaryKey: true, autoIncrement: true, },
        seatId: {
            type: DataType.INTEGER,
            allowNull: true,
            references: {
                model: {
                    tableName: 'seat',
                },
                key: 'id',
            },
            onDelete: 'cascade',
        },
        bookingTicketId: {
            type: DataType.INTEGER,
            allowNull: true,
            references: {
                model: {
                    tableName: 'booking_ticket',
                },
                key: 'id',
            },
            onDelete: 'cascade',
        },
        createdAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
        updatedAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
    } as ModelAttributes);

    await queryInterface.createTable('seat', {
        id: { type: 'integer', primaryKey: true, autoIncrement: true, },
        name: { type: DataType.STRING },
        seatTypeId: {
            type: DataType.INTEGER,
            allowNull: true,
            references: {
                model: {
                    tableName: 'seat_type',
                },
                key: 'id',
            },
            onDelete: 'cascade',
        },
        createdAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
        updatedAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
    } as ModelAttributes);

    await queryInterface.createTable('seat_type', {
        id: { type: 'integer', primaryKey: true, autoIncrement: true, },
        title: { type: DataType.STRING },
        premiumValuePercetage: { type: DataType.INTEGER },
        createdAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },
        updatedAt: {
            type: DataType.DATE,
            defaultValue: literal(`${CURRENT_TIMESTAMP}`),
        },

    } as ModelAttributes);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
