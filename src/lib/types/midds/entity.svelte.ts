import type { SubmittableExtrinsic } from '@polkadot/api-base/types'
import type { ApiPromise } from '@polkadot/api'

abstract class MiddsEntity implements IMiddsEntity {
    fields: IMiddsEntityField<MiddsEntityFieldType>[] = []
    readonly name: string
    readonly value: string
    disabled: boolean
    fieldsValueAreValid: boolean = $derived(
        this.fields.every((field) => field.valueIsValid) &&
        !this.fields.every((field) => field.value === '')
    )

    protected constructor(name: string, fields: IMiddsEntityField<MiddsEntityFieldType>[]) {
        this.name = name
        this.value = name.toLowerCase()
        this.fields = fields
        this.disabled = false
    }

    abstract createTx(api: ApiPromise): SubmittableExtrinsic<'promise'>
}

export class MusicalWorkMiddsEntity extends MiddsEntity {
    constructor() {
        super('Musical Work', [
            new MiddsEntityField<string>('Title', 'Enter Title', '', null),
            new MiddsEntityField<string>('Composer', 'Enter Composer name', '', null),
            new MiddsEntityField<number>('Year', 'Enter Year', 0, null),
        ])
    }

    override createTx(api: ApiPromise): SubmittableExtrinsic<'promise'> {
        return api.tx.musicalWorks.register({ ipi: '' })
    }
}

export class StakeholderMiddsEntity extends MiddsEntity {
    constructor() {
        super('Stakeholder', [
            new MiddsEntityField<string>('IPI Number', 'Enter the IPI Name Number', '', new RegExp('^\\d{2}[-\\s]?\\d{3}[-\\s]?\\d{3}[-\\s]?\\d{1,3}$')),
            new MiddsEntityField<string>('First Name', 'Enter First Name', '', new RegExp('^.{0,128}$')),
            new MiddsEntityField<string>('Last Name', 'Enter Last Name', '', new RegExp('^.{0,128}$')),
            new MiddsEntityField<string>('Nickname', 'Enter Nickname', '', new RegExp('^.{0,128}$')),
        ])
    }

    override createTx(api: ApiPromise): SubmittableExtrinsic<'promise'> {
        const ipi = this.fields.at(0)?.value
        const firstName = this.fields.at(1)?.value
        const lastName = this.fields.at(2)?.value
        const nickname = this.fields.at(3)?.value

        return api.tx.stakeholders.register({ ipi, firstName, lastName, nickname })
    }
}

export class DisabledMiddsEntity extends MiddsEntity {
    tag: string

    constructor(name: string, tag: string) {
        super(name, [])
        this.disabled = true
        this.tag = tag
    }

    createTx(): SubmittableExtrinsic<'promise'> {
        throw new Error('Disabled Midds Entity does not have Tx creation, this is likely unexpected to see this error.')
    }
}

export class MiddsEntityField<T extends MiddsEntityFieldType> implements IMiddsEntityField<T> {
    readonly id: string
    readonly label: string
    readonly name: string
    readonly placeholder: string
    readonly regex: RegExp | null = null
    value: T | null = $state(null)
    readonly valueIsValid: boolean = $derived(
        (this.regex !== null && typeof this.value === 'string' && this.value !== '')
            ? this.regex.test(this.value)
            : true
    )

    constructor(label: string, placeholder: string, value: T, regex: RegExp | null) {
        this.label = label
        this.id = label.toLowerCase()
        this.name = label.toLowerCase()
        this.placeholder = placeholder
        this.value = value

        if (typeof value === 'string') {
            this.regex = regex
        }
    }
}

export type MiddsEntityFieldType = number | string;

export interface IMiddsEntity {
    readonly name: string;
    readonly value: string;
    readonly disabled: boolean;
    readonly fields: IMiddsEntityField<MiddsEntityFieldType>[];
    readonly fieldsValueAreValid: boolean

    createTx(api: ApiPromise): SubmittableExtrinsic<'promise'>
}

export interface IMiddsEntityField<T extends MiddsEntityFieldType> {
    readonly name: string;
    readonly id: string;
    readonly label: string;
    readonly placeholder: string;
    readonly regex: RegExp | null;
    value: T | null;
    readonly valueIsValid: boolean;
}
