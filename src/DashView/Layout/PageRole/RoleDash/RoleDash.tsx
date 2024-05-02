import './RoleDash.css'
import { useDashRoute } from '../../../dashStore'
import { FilterSwitch } from '../../../Component/GenericList/ListSearchBar/Filter/FilterSwitch/FilterSwitch'
import { useRoleStore } from '../RoleStore';
import { bindToParentScroll } from '../../../../Tools/BindToParentScroll';
export function RoleDash() {

    const { selectedRole, json_roles } = useRoleStore();
    const { current, } = useDashRoute();

    return current('edit_role', 'create_role') && (
        <div className="role-dash" ref={bindToParentScroll}>
            <section className='editor'>
                <div className="left-side">

                </div>
                <div className="right-side">
                    {json_roles && (
                        Object.keys(json_roles).map(j => FilterSwitch((selectedRole as any)[j]).getView(j, () => { }))
                    )}

                </div>
            </section>
        </div>
    )
}
