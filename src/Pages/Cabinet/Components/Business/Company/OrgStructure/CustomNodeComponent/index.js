import React from "react";
import styles from "./CustomNodeComponent.module.sass";
import { Handle } from "react-flow-renderer";
import {imageSrc} from '../../../../../../../generalComponents/globalVariables';
import classNames from "classnames";

function CustomNodeComponent({ data }) {
	
	return (
		<div className={classNames({[styles.node]: true, [styles.inner]: data.inner})}>
			{!data.inner &&
			<Handle type="target" position="left" style={{ width: 10, height: 10, borderRadius: 50, background: '#4086F1' }} />}
			<div className={styles.person}>
				<div className={styles.avatar}>
					<img src={`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`} alt='avatar' className={styles.icon}/>
				</div>
				<div className={styles.text}>
					<p className={styles.name}>{data.name}</p>
					<p className={styles.position}>{data.position}</p>
				</div>
				<div className={styles.menuWrap}>
					<span className={styles.menu} />
				</div>
			</div>
			<Handle type="source" position={data.inner ? "bottom" : "right"} style={{ width: 10, height: 10, borderRadius: 50, background: '#4086F1'  }} />
		</div>
	);
}

export default CustomNodeComponent;
